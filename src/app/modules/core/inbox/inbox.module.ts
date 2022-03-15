import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientInboxComponent } from './patient-inbox/patient-inbox.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { InboxRoutingModule } from './inbox-routing.module';
import { NurseInboxComponent } from './nurse-inbox/nurse-inbox.component';
import { PhysicianInboxComponent } from './physician-inbox/physician-inbox.component';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    PatientInboxComponent,
    NurseInboxComponent,
    PhysicianInboxComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,    
    MatTableModule,
    InboxRoutingModule,
    MatExpansionModule
  ]
})
export class InboxModule { }
