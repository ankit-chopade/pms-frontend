import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientUserManagementComponent } from './patient-user-management/patient-user-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    PatientUserManagementComponent,
    EmployeeRegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
