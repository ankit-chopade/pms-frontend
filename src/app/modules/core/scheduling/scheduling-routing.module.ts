import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseSchedulingComponent } from './nurse-scheduling/nurse-scheduling.component';
import { PatientSchedulingComponent } from './patient-scheduling/patient-scheduling.component';
import { PhysicianSchedulingComponent } from './physician-scheduling/physician-scheduling.component';

const routes: Routes = [
    
    {
      path: 'patient-scheduling',
      component: PatientSchedulingComponent
    },
    {
      path:'physician-scheduling',
      component:PhysicianSchedulingComponent
    },
    {
      path:"nurse-scheduling",
      component:NurseSchedulingComponent,
    }
    
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SchedulingRoutingModule {
  constructor(){
  }

 }
