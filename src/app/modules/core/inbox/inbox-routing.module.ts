import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseAuthGuardService } from '../../default/service/nurse-auth-guard-service.service';
import { PatientAuthGuardService } from '../../default/service/patient-auth-guard-service.service';
import { PhysicianAuthGuardService } from '../../default/service/physician-auth-guard-service.service';
import { NurseInboxComponent } from './nurse-inbox/nurse-inbox.component';
import { PatientInboxComponent } from './patient-inbox/patient-inbox.component';
import { PhysicianInboxComponent } from './physician-inbox/physician-inbox.component';

const routes: Routes = [
  {
    path: 'patient-inbox',
    component: PatientInboxComponent,
    canActivate: [PatientAuthGuardService]
    
  },
  {
    path: 'nurse-inbox',
    component: NurseInboxComponent,
    canActivate: [NurseAuthGuardService]
    
  },
  {
    path: 'physician-inbox',
    component: PhysicianInboxComponent,
    canActivate: [PhysicianAuthGuardService]
    
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class InboxRoutingModule {
  constructor(){

  }
}