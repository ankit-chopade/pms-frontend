import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseAuthGuardService } from '../../default/service/nurse-auth-guard-service.service';
import { PatientAuthGuardService } from '../../default/service/patient-auth-guard-service.service';
import { PhysicianAuthGuardService } from '../../default/service/physician-auth-guard-service.service';
import { NurseSchedulingComponent } from './nurse-scheduling/nurse-scheduling.component';
import { PatientSchedulingComponent } from './patient-scheduling/patient-scheduling.component';
import { PhysicianSchedulingComponent } from './physician-scheduling/physician-scheduling.component';

const routes: Routes = [
    
    {
      path: 'patient-scheduling',
      component: PatientSchedulingComponent,
      canActivate: [PatientAuthGuardService]
    },
    {
      path:'physician-scheduling',
      component:PhysicianSchedulingComponent,
      canActivate: [PhysicianAuthGuardService]
    },
    {
      path:"nurse-scheduling",
      component:NurseSchedulingComponent,
      canActivate: [NurseAuthGuardService]
    }
    
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SchedulingRoutingModule {
  constructor(){
  }

 }
