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
import { WebApiAdaptor } from '@syncfusion/ej2-data';
import { ApiService } from '../service/api.service';
import { Physician } from '../model/physician';
import { Appointment } from '../model/appointent';
import { map } from 'lodash';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
declare var moment: any;
import { createElement } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-nurse-scheduling',
  templateUrl: './nurse-scheduling.component.html',
  styleUrls: ['./nurse-scheduling.component.scss']
})
export class NurseSchedulingComponent {

  constructor(private apiCommonService: ApiService, private notifyService: NotificationService) { }

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public physician: Physician[];
  public patient: any;
  public specialistselected: any;
  public patientselected: any;
  public scheduleData: Record<string, any>[] | DataManager | undefined;
  public allappointments_physician: Record<string, any>[];//from db
  public allappointments_patient: Record<string, any>[];//from db
  public emptyRecords: Record<string, any>[];
  public disable: boolean = true;
  public filteredData: Record<string, any>[];
  public openededithistorysidebar:boolean=false;
  public editHistoryDatasource:any[];
  public allappointments: Record<string, any>[];

  minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
  };
  public eventSettings: EventSettingsModel = {
    fields: {
      location: { name: 'Location', title: 'Reason of Appointment Modification', default: 'Not Applicable', validation: { required: true } },
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
  public appointment: any;
  public appointmentDummy: any[];

  specialistSelected() {

    if (this.specialistselected == 0 || this.specialistselected == undefined || this.patientselected == 0 || this.patientselected == undefined) {
      this.disable = true
    }
    else {
      this.disable = false
    }
    if (this.specialistselected == 0) {
      this.specialistselected = undefined;
      this.getPatientsAppintments(this.patientselected);
    }
    this.getPhysicianAppintments(this.specialistselected);
  }
  patientSelected() {
    if (this.specialistselected == 0 || this.specialistselected == undefined || this.patientselected == 0 || this.patientselected == undefined) {
      this.disable = true
    }
    else {
      this.disable = false
    }
    if (this.patientselected == 0) {
      this.patientselected = undefined;
      this.getPhysicianAppintments(this.specialistselected);
    }

    this.getPatientsAppintments(this.patientselected);
  }

  toggleSideBar(){
   
    if(this.patientselected!=undefined) { //&& this.specialistselected==undefined){
      this.openededithistorysidebar=!this.openededithistorysidebar;
      this.getEditHistory(this.patientselected)
    }
    else{
      this.notifyService.showWarning("Please select Patient","Warning")
    }
    // this.getEditHistory(parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId')))))

  }

  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view') {
      // alert(args.action)
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreated') {
      // console.log("in event change")
      this.appointmentDummy = JSON.parse(JSON.stringify(this.scheduleObj.eventSettings.dataSource));
      let length = this.appointmentDummy.length - 1;
      this.appointment = this.appointmentDummy[this.appointmentDummy.length - 1]
      this.appointment.patientId = this.patientselected// parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));
      this.appointment.physicianId = this.specialistselected;
      const appointmentParam: any = {
        endTime: this.appointment.EndTime,
        endTimezone: this.appointment.EndTimezone == undefined ? 'Asia/Calcutta' : this.appointment.EndTimezone,
        id: this.appointment.Id,
        isAllDay: this.appointment.IsAllDay,
        recurrenceRule: this.appointment.RecurrenceRule,
        startTime: this.appointment.StartTime,
        startTimezone: this.appointment.StartTimezone == undefined ? 'Asia/Calcutta' : this.appointment.StartTimezone,
        subject: this.appointment.Subject,
        isReadonly: this.appointment.IsReadonly==undefined?false:this.appointment.IsReadonly,
        isBlock: this.appointment.IsBlock == undefined ? false : true,
        patientId: this.appointment.patientId,
        physicianId: this.appointment.physicianId,
        description: this.appointment.Description == undefined ? '' : this.appointment.Description
      }
        // console.log(appointmentParam)
        this.savePatientAppintment(appointmentParam)

    }
    if( args.requestType === 'eventChanged' ){
     let length = args.changedRecords?.length;
     if(length!=undefined){
      this.appointment=JSON.parse(JSON.stringify(args.changedRecords))
      this.appointment=this.appointment[length-1];
      this.appointment.patientId = this.patientselected// parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));
      this.appointment.physicianId = this.specialistselected;
      let dummy = this.allappointments_patient.filter(a=>a['Id']==this.appointment.Id);
      const appointmentParam : any = {
        endTime : this.appointment.EndTime,
        endTimezone: this.appointment.EndTimezone== undefined ? 'Asia/Calcutta' : this.appointment.EndTimezone,
        id: this.appointment.Id,
        isAllDay: this.appointment.IsAllDay,
        recurrenceRule: this.appointment.RecurrenceRule,
        startTime: this.appointment.StartTime,
        startTimezone: this.appointment.StartTimezone== undefined ? 'Asia/Calcutta' : this.appointment.StartTimezone,
        subject: this.appointment.Subject,
        isReadonly:this.appointment.IsReadonly,
        isBlock:this.appointment.IsBlock,
        patientId:this.appointment.patientId,
        physicianId:this.appointment.physicianId,
        description:this.appointment.Description,
        appointmentId : dummy[0]['appointmentId']
      }
      // console.log(appointmentParam)
      this.saveEditedAppointemnt(appointmentParam)
      var dt = new Date();
      const edithistoryParam:any={
        appointmentId : dummy[0]['appointmentId'],
        endTime : this.appointment.EndTime,
        startTime: this.appointment.StartTime,
        patientId:this.patientselected,
        physicianId:this.specialistselected,
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
    if (args.requestType === 'eventRemoved' && args != undefined) {
      let length = args.deletedRecords?.length;
      if (length != undefined) {
        this.appointment = JSON.parse(JSON.stringify(args.deletedRecords))
        let Id = this.appointment[0]['appointmentId'];
        this.deletePhysicianAppintments(Id)
      }
    }

  }



  ngOnInit(): void {
    this.apiCommonService.getPhysician().subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.physician = resp['result'];
        }
      }
      ,
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
      })
    );

    this.apiCommonService.getPatient().subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.patient = resp['result'];
        }
      }
      ,
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
      })
    );
  }

  savePatientAppintment(appointment: Appointment) {
    this.apiCommonService.savePatientAppintment(appointment).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.notifyService.showSuccess("Appointment has been saved successfully", "Success")
        }
      },
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
      })
    );
  }

  getPhysicianAppintments(Id: Number) {
    const appointmentParam: any = {
      id: Id
    }
    this.apiCommonService.getPhysicianAppintments(appointmentParam).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.allappointments_physician = resp['result'];
          this.toGreaterCasePhysician();
          if (this.patientselected == undefined) {
            this.scheduleObj.eventSettings.dataSource = this.allappointments_physician;
          }
          if (this.specialistselected !== undefined && this.patientselected != undefined) {
            // let filteredData: Record<string, any>[];
            // this.allappointments.push(this.allappointments_patient)
            let set_patient  = new Set(this.allappointments_patient)
            let set_physician = new Set(this.allappointments_physician)
            let merged = new Set([...set_patient,...set_physician])
            // console.log(merged)
            this.allappointments=Array.of(merged)
            this.allappointments =[...this.allappointments_patient,...this.allappointments_physician]
            // this.allappointments.concat(this.allappointments_patient,this.allappointments_physician);
            // console.log(this.allappointments_patient)
            // this.allappointments_patient.forEach( (value) => {
            //   console.log(value)
            //   this.allappointments.push(value)
            // })
            // this.allappointments_physician.forEach( (value) => {
            //   this.allappointments.push(value)
            // })
            // this.allappointments.concat(this.allappointments_physician)
            // set.add(this.allappointments)
            // set.add(this.allappointments_patient);
            // set.add(this.allappointments_physician)
            // console.log(set)
            // this.allappointments.push(this.allappointments_physician)      
            // const expected = new Set();
            // this.allappointments = this.allappointments.filter(item => !expected.has(JSON.stringify(item)) ? expected.add(JSON.stringify(item)) : false);
            // this.allappointments =Array.of(set);
            // console.log(this.allappointments)
            this.allappointments.forEach( (value) =>{
              if(value['patientId']!=this.patientselected && value['PhysicianId']!= this.specialistselected){
                value['IsReadonly'] = true;

              }
            })

            // filteredData = this.allappointments_patient.filter(a => a['physicianId'] == this.specialistselected)
            this.scheduleObj.eventSettings.dataSource = this.allappointments;
          }
          if (this.patientselected == 0 || this, this.patientselected == undefined) {
            this.allappointments_physician.forEach(function (value) {
              value['IsReadonly'] = true;
            })
          }


        }
      },
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
      })
    );
  }

  getPatientsAppintments(Id: number) {
    const appointmentParam: any = {
      id: Id
    }
    this.apiCommonService.getPatientAppintments(appointmentParam).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.allappointments_patient = resp['result'];
          this.toGreaterCasePatient();
          if (this.specialistselected == undefined) {
            this.scheduleObj.eventSettings.dataSource = this.allappointments_patient;
          }
          if (this.specialistselected != undefined && this.patientselected != undefined) {
            this.filteredData = this.allappointments_patient.filter(a => a['physicianId'] == this.specialistselected)
            this.scheduleObj.eventSettings.dataSource = this.filteredData;
          }

          if ((this.specialistselected == 0 || this.specialistselected == undefined || this.patientselected == 0 || this.patientselected == undefined)&& this.filteredData!=null) {
            this.filteredData.forEach(function (value) {
              value['IsReadonly'] = true;
            })
            if(this.specialistselected==undefined&&this.patientselected!=undefined){
              this.scheduleObj.eventSettings.dataSource = this.allappointments_patient;
            }else{
              this.scheduleObj.eventSettings.dataSource = this.filteredData;
            }
          }
        }
      },
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
      })
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
  saveEditedAppointemnt(appointment: Appointment) {
    this.apiCommonService.saveEditedAppointemnt(appointment).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          let editedappointment = resp['result'];
          //  this.toGreaterCase();
          this.getPhysicianAppintments(this.specialistselected)
          this.notifyService.showSuccess("Appointment has been edited successfully", "Success")
        }
      },
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
      })
    );
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

  deletePhysicianAppintments(Id: Number) {
    const appointmentParam: any = {
      id: Id
    }
    this.apiCommonService.deletePhysicianAppintments(appointmentParam).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.notifyService.showSuccess("Appointment has been deleted successfully", "Success")
        }
      },
      (err => {
        this.notifyService.showError("Please try after some time", "Error");
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
