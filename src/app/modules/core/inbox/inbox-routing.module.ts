import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseInboxComponent } from './nurse-inbox/nurse-inbox.component';
import { PatientInboxComponent } from './patient-inbox/patient-inbox.component';
import { PhysicianInboxComponent } from './physician-inbox/physician-inbox.component';

const routes: Routes = [
  {
    path: 'patient-inbox',
    component: PatientInboxComponent,
    
  },
  {
    path: 'nurse-inbox',
    component: NurseInboxComponent,
    
  },
  {
    path: 'physician-inbox',
    component: PhysicianInboxComponent,
    
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class InboxRoutingModule {
  constructor(){

  }
}