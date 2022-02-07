import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { SelectedEventArgs, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import {
  ScheduleComponent, GroupModel, DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
  TimelineViewsService, TimelineMonthService, TimelineYearService, View, EventSettingsModel, Timezone, CurrentAction,
  CellClickEventArgs, ResourcesModel, EJ2Instance, PrintService, ExcelExportService, ICalendarExportService, CallbackFunction, NavigatingEventArgs, ActionEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { addClass, extend, removeClass, closest, remove, isNullOrUndefined, Internationalization, compile } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs, SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectComponent, ChangeEventArgs, MultiSelectChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import {
  ClickEventArgs, ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs
} from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
import {  WebApiAdaptor } from '@syncfusion/ej2-data';
import { ApiService } from '../service/api.service';
import { Physician } from '../model/physician';
import { scheduleData } from '../../../../../data';
import { Appointment } from '../model/appointent';
import { map } from 'lodash';
declare var moment: any;

/**
 * Sample for overview
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-patient-scheduling',
  templateUrl: './patient-scheduling.component.html',
  styleUrls: ['./patient-scheduling.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
    TimelineViewsService, TimelineMonthService, TimelineYearService, PrintService, ExcelExportService, ICalendarExportService],
  encapsulation: ViewEncapsulation.None
})

export class PatientSchedulingComponent  implements OnInit{
 constructor(private apiCommonService: ApiService){}

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  public physician: Physician[];
  public specialistselected: number;
  public physicianlist:string[];
  public scheduleData: Record<string, any>[]| DataManager|undefined;
  public data: Record<string, any>[] = scheduleData;
  public eventSettings: EventSettingsModel;// = { dataSource: this.data };
  public appointment:any;
  public appointmentDummy:any[];
  public disable:boolean=true
  specialistSelected(){
    this.disable=false;
    // console.log(this.specialistselected)
  }

  // public eventSettings: EventSettingsModel = { dataSource:[
  //   {
  //     Subject:"Testing",
  //     StartTime:new Date(2022,1,3,4,0),
  //     EndTime: new  Date(2022,1,3,6,0),
  //     // IsAllDay:true,
  //     // RecurrenceRule:"FREQ=DAILY;INTERVAL=1;COUNT=10",
  //     // IsReadonly:true,
  //     IsBlock:true
  //   }
  // ]};
  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view' ) {
      alert(args.action)
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreated') {
      this.appointmentDummy = JSON.parse(JSON.stringify(this.scheduleObj.eventSettings.dataSource));
      let length = this.appointmentDummy.length -1;
      this.appointment=this.appointmentDummy[this.appointmentDummy.length-1]
      this.appointment=args.data
      // this.appointment.patientId = parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));
      // this.appointment.physicianId = this.specialistselected;

      // const appointmentParam : any = {
      //   endTime : this.appointment.EndTime,
      //   endTimezone: null,
      //   id: this.appointment.Id,
      //   isAllDay: this.appointment.IsAllDay,
      //   recurrenceRule: this.appointment.RecurrenceRule,
      //   startTime: this.appointment.StartTime,
      //   startTimezone: this.appointment.StartTimezone,
      //   subject: this.appointment.Subject,
      //   isReadonly:this.appointment.IsReadonly,
      //   isBlock:this.appointment.IsBlock,
      //   patientId:this.appointment.patientId,
      //   physicianId:this.appointment.physicianId,
      //   description:this.appointment.Description
      // }
      // console.log(appointmentParam)
      console.log(args.data?.filter((p: { Id: any; }) => p.Id==1))
      
      // this.savePatientAppintment(appointmentParam)
    }
    if( args.requestType === 'eventChanged' ){
      // console.log(this.scheduleObj.getCurrentViewEvents().concat(JSON.parse(JSON.stringify(this.scheduleObj.eventSettings.dataSource))))
      // console.log(this.scheduleObj.eventSettings.dataSource)
      // https://ej2.syncfusion.com/angular/documentation/schedule/crud-actions/#how-to-edit-from-the-current-and-following-events-of-a-series
      console.log(args.data)
    }
    if(args.requestType === 'eventRemoved'){

    }
    // this.scheduleObj.eventSettings.dataSource = this.data as Record<string, any>[];
    

  }

  ngOnInit(): void {
    this.apiCommonService.getPhysician().subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.physician=resp['result'];
          this.physicianlist=this.physician.map(p=>p.title+" "+p.firstName + " " +p.lastName)
        }
      }
    );
  }

  savePatientAppintment(appointment:Appointment){
    this.apiCommonService.savePatientAppintment(appointment).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
         console.log(resp['result'])
        }
      }
    );
  }


}