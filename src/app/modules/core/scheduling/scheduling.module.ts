import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientSchedulingComponent } from './patient-scheduling/patient-scheduling.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingRoutingModule } from './scheduling-routing.module';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, RecurrenceEditorModule, ScheduleModule,ResizeService, DragAndDropService} from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ContextMenuModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { PhysicianSchedulingComponent } from './physician-scheduling/physician-scheduling.component';
import { NurseSchedulingComponent } from './nurse-scheduling/nurse-scheduling.component';



@NgModule({
  declarations: [
    PatientSchedulingComponent,
    PhysicianSchedulingComponent,
    NurseSchedulingComponent
  ],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService,ResizeService, DragAndDropService],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    SchedulingRoutingModule,
    ScheduleModule,
    RecurrenceEditorModule,
    DropDownListModule,
    UploaderModule,
    ToolbarModule,
    SwitchModule,
    TextBoxModule,
    ContextMenuModule,
    MultiSelectModule,
    TimePickerModule
  ]
})
export class SchedulingModule { }
