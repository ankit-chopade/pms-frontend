import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientSchedulingComponent } from './patient-scheduling/patient-scheduling.component';

const routes: Routes = [
    
    {
      path: 'patient-scheduling',
      component: PatientSchedulingComponent
    },
    
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SchedulingRoutingModule {
  constructor(){
  }

 }
