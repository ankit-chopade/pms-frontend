import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PatientDetailsComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PatientModule { }
