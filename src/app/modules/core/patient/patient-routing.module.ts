import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
    
    {
      path: 'patient-details',
      component: PatientDetailsComponent
    },
    
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule {
  constructor(){
  }

 }
