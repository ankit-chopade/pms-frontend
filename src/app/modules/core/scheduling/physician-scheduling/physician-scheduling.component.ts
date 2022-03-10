import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { Input, SelectedEventArgs, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import {
  ScheduleComponent, GroupModel, DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
  TimelineViewsService, TimelineMonthService, TimelineYearService, View, EventSettingsModel, Timezone, CurrentAction,
  CellClickEventArgs, ResourcesModel, EJ2Instance, PrintService, ExcelExportService, ICalendarExportService, CallbackFunction, NavigatingEventArgs, ActionEventArgs, PopupOpenEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { addClass, extend, removeClass, closest, remove, isNullOrUndefined, Internationalization, compile } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs, SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectComponent, ChangeEventArgs, MultiSelectChangeEventArgs, DropDownListComponent, DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import {
  ClickEventArgs, ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs
} from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
import {  WebApiAdaptor } from '@syncfusion/ej2-data';
import { ApiService } from '../service/api.service';
import { Physician } from '../model/physician';
import { Appointment } from '../model/appointent';
import { map } from 'lodash';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
declare var moment: any;
import { createElement } from '@syncfusion/ej2-base';
import { DateTimePicker } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-physician-scheduling',
  templateUrl: './physician-scheduling.component.html',
  styleUrls: ['./physician-scheduling.component.scss']
})
export class PhysicianSchedulingComponent {

  constructor(private apiCommonService: ApiService,private notifyService : NotificationService){}

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  
  public patient: Physician[];
  public patientselected: number;
  public patientlist:string[];
  public scheduleData: Record<string, any>[]| DataManager|undefined;
  public allappointments: Record<string, any>[];//from db
   public allappointments_patient: Record<string, any>[]; //from db
  public allappointments_physician: Record<string, any>[]; //from db
  minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
};
  public eventSettings: EventSettingsModel={
    fields:{
      location: { name: 'Location', title: 'Reason of Appointment Modification',default:'Not Applicable',validation: { required: true }},
      subject: { name: 'Subject', validation: { required: true } },
      description: {
        name: 'Description', validation: {
            required: true, minLength: [this.minValidation, 'Need atleast 5 letters to be entered']
        }
    },
    startTime: { name: 'StartTime', validation: { required: true } },
    endTime: { name: 'EndTime', validation: { required: true } }

    }
  };
  public appointment:any;
  public appointmentDummy:any[];
  public disable:boolean=true
  public openededithistorysidebar:boolean=false;
  public editHistoryDatasource:any[];
  public showQuickInfo: Boolean = false;

  toggleSideBar(){
    if(this.patientselected!=null){
      this.openededithistorysidebar=!this.openededithistorysidebar;
      this.getEditHistory(this.patientselected)
    }
    else{
      this.notifyService.showWarning("Please select Patient","Warning")
    }

  }
  patientSelected(){
    this.disable=false;    
    this.getPatientAppintments(this.patientselected);

  }
  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view' ) {
      // alert(args.action)
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreated') {
      this.appointmentDummy = JSON.parse(JSON.stringify(this.scheduleObj.eventSettings.dataSource));
      let length = this.appointmentDummy.length -1;
      this.appointment=this.appointmentDummy[this.appointmentDummy.length-1]
      this.appointment.patientId = this.patientselected;
      this.appointment.physicianId = parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));
      const appointmentParam : any = {
        endTime : this.appointment.EndTime,
        endTimezone: this.appointment.EndTimezone==undefined?'Asia/Calcutta':this.appointment.EndTimezone,
        id: this.appointment.Id,
        isAllDay: this.appointment.IsAllDay,
        recurrenceRule: this.appointment.RecurrenceRule,
        startTime: this.appointment.StartTime,
        startTimezone: this.appointment.StartTimezone==undefined?'Asia/Calcutta':this.appointment.StartTimezone,
        subject: this.appointment.Subject,
        isReadonly:this.appointment.IsReadonly==undefined?false:this.appointment.IsReadonly,
        isBlock:this.appointment.IsBlock==undefined?false:true,
        patientId:this.appointment.patientId,
        physicianId:this.appointment.physicianId,
        description:this.appointment.Description==undefined?'':this.appointment.Description
      }
      // console.log(appointmentParam)
      this.savePatientAppintment(appointmentParam)
    }
    if( args.requestType === 'eventChanged' ){
     let length = args.changedRecords?.length;
     if(length!=undefined){
      this.appointment=JSON.parse(JSON.stringify(args.changedRecords))
      this.appointment=this.appointment[length-1];
      this.appointment.patientId = this.patientselected;
      this.appointment.physicianId = parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));
      let dummy = this.allappointments.filter(a=>a['Id']==this.appointment.Id);
      const appointmentParam : any = {
        endTime : this.appointment.EndTime,
        endTimezone: this.appointment.EndTimezone,
        id: this.appointment.Id,
        isAllDay: this.appointment.IsAllDay,
        recurrenceRule: this.appointment.RecurrenceRule,
        startTime: this.appointment.StartTime,
        startTimezone: this.appointment.StartTimezone,
        subject: this.appointment.Subject,
        isReadonly:this.appointment.IsReadonly,
        isBlock:this.appointment.IsBlock,
        patientId:this.appointment.patientId,
        physicianId:this.appointment.physicianId,
        description:this.appointment.Description,
        appointmentId : dummy[0]['appointmentId']
      }
      // console.log(this.appointment)
      this.saveEditedAppointemnt(appointmentParam)
      var dt = new Date();
      const edithistoryParam:any={
        appointmentId : dummy[0]['appointmentId'],
        endTime : this.appointment.EndTime,
        startTime: this.appointment.StartTime,
        patientId:this.appointment.patientId,
        physicianId:this.appointment.physicianId,
        editedBy:parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId')))),
        reason:this.appointment.Location,
        description:this.appointment.Description,
        subject: this.appointment.Subject,
        editTime:new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
      }
      // console.log(edithistoryParam)
      this.saveEditHistory(edithistoryParam)
     }
    }
    if(args.requestType === 'eventRemoved' && args!=undefined){
      let length = args.deletedRecords?.length;
      if(length!=undefined){
        this.appointment=JSON.parse(JSON.stringify(args.deletedRecords))
        let Id = this.appointment[0]['appointmentId'];
        this.deletePhysicianAppintments(Id)
      }
    }
    
  }


  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'Editor') {
      let startElement: HTMLInputElement = args.element.querySelector(
        '#StartTime'
      ) as HTMLInputElement;
      if (!startElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker(
          { value: new Date(startElement.value) || new Date() },
          startElement
        );
      }
      let endElement: HTMLInputElement = args.element.querySelector(
        '#EndTime'
      ) as HTMLInputElement;
      if (!endElement.classList.contains('e-datetimepicker')) {
        new DateTimePicker(
          { value: new Date(endElement.value) || new Date() },
          endElement
        );
      }
    }
  }


  ngOnInit(): void {
    this.apiCommonService.getPatient().subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.patient=resp['result'];
          this.patientlist=this.patient.map(p=>p.title+" "+p.firstName + " " +p.lastName)
        }
      }
      ,
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }

  savePatientAppintment(appointment:Appointment){
    this.apiCommonService.savePatientAppintment(appointment).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.notifyService.showSuccess("Appointment has been saved successfully","Success")
        }
      },
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }

  getPatientAppintments(Id:number){
    this.getPhysicianAppintments(parseInt(JSON.parse(JSON.stringify(sessionStorage.getItem('userId')))))
    const appointmentParam : any = {
      id: Id
    }
    this.apiCommonService.getPatientAppintments(appointmentParam).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
         this.allappointments_patient = resp['result'];
         this.toGreaterCasePatient();
         this.allappointments =[...this.allappointments_patient,...this.allappointments_physician]
         this.allappointments=  this.allappointments.filter((value, index) => this.allappointments.map(a=>a['appointmentId']).indexOf(value['appointmentId']) === index);
         this.blockEvents(Id);

         this.scheduleObj.eventSettings.dataSource = this.allappointments;
        //  console.log(this.allappointments)
        }
      },
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }
  getPhysicianAppintments(Id: number) {
    const appointmentParam: any = {
      id: Id,
    };
    this.apiCommonService.getPhysicianAppintments(appointmentParam).subscribe(
      (resp) => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.allappointments_physician = resp['result'];
          console.log(this.allappointments_physician)
          this.toGreaterCasePhysician();
                   // this.toGreaterCasePhysician();

          // this.scheduleObj.eventSettings.dataSource = this.allappointments;
        }
      },
      (err) => {
        this.notifyService.showError('Please try after some time', 'Error');
      }
    );
  }

  toGreaterCasePhysician() {
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"endTime":').join('"EndTime":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"endTimezone":').join('"EndTimezone":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"id":').join('"Id":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"isAllDay":').join('"IsAllDay":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"recurrenceRule":').join('"RecurrenceRule":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"startTime":').join('"StartTime":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"startTimezone":').join('"StartTimezone":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"subject":').join('"Subject":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"isReadonly":').join('"IsReadonly":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"isBlock":').join('"IsBlock":'))
    this.allappointments_physician = JSON.parse(JSON.stringify(this.allappointments_physician).split('"description":').join('"Description":'))
  }

  toGreaterCasePatient() {
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"endTime":').join('"EndTime":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"endTimezone":').join('"EndTimezone":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"id":').join('"Id":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"isAllDay":').join('"IsAllDay":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"recurrenceRule":').join('"RecurrenceRule":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"startTime":').join('"StartTime":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"startTimezone":').join('"StartTimezone":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"subject":').join('"Subject":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"isReadonly":').join('"IsReadonly":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"isBlock":').join('"IsBlock":'))
    this.allappointments_patient = JSON.parse(JSON.stringify(this.allappointments_patient).split('"description":').join('"Description":'))
  }

  toGreaterCase(){
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"endTime":').join('"EndTime":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"endTimezone":').join('"EndTimezone":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"id":').join('"Id":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"isAllDay":').join('"IsAllDay":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"recurrenceRule":').join('"RecurrenceRule":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"startTime":').join('"StartTime":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"startTimezone":').join('"StartTimezone":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"subject":').join('"Subject":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"isReadonly":').join('"IsReadonly":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"isBlock":').join('"IsBlock":'))
    this.allappointments = JSON.parse(JSON.stringify(this.allappointments).split('"description":').join('"Description":'))
  }

  saveEditedAppointemnt(appointment:Appointment){
    this.apiCommonService.saveEditedAppointemnt(appointment).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
         let editedappointment = resp['result'];
         this.toGreaterCase();
         this.getPatientAppintments(this.patientselected)
         this.notifyService.showSuccess("Appointment has been edited successfully","Success")
        }
      },
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }

  deletePhysicianAppintments(Id:Number){
    const appointmentParam : any = {
      id: Id
    }
    this.apiCommonService.deletePhysicianAppintments(appointmentParam).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
         this.notifyService.showSuccess("Appointment has been deleted successfully","Success")
        }
      },
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }

  // blockEvents(){
  //   let id = parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));
  //   this.allappointments.forEach(function (value){
  //     if(value['physicianId']!=id){
  //       value['isBlock']=true;
  //     }
  //     else{
  //       value['isBlock']=false;

  //     }
  //   })

  // }
  blockEvents(Id?:number) {
    // alert("In block")
    let id = parseInt(
      JSON.parse(JSON.stringify(sessionStorage.getItem('userId')))
    );
    if(this.allappointments.length!=0){
    this.allappointments.forEach(function (value) {
      // alert("In for each")
      if (value['patientId'] != Id || value['physicianId'] != id) {
        value['IsBlock'] = true;
        value["Subject"]="Not Available";
        console.log(value)
      } else {
        value['IsBlock'] = false;
      }
    });
  }
}

  saveEditHistory(editHistory:any){
    this.apiCommonService.saveEditHistory(editHistory).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
        //  alert("Success");
        }
      },
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }

  getEditHistory(Id:number){
    const editHistoryParam : any = {
      id: Id
    }
    this.apiCommonService.getEditHistory(editHistoryParam).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
         this.editHistoryDatasource=resp['result'];
        }
      },
      (err=>{
        this.notifyService.showError("Please try after some time","Error");
      })
    );
  }

}
