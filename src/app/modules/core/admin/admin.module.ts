import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeRegistrationComponent } from './employee-management/employee-registration/employee-registration.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { EmployeeDetailsComponent } from './employee-management/employee-details/employee-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeManagementComponent,
    EmployeeRegistrationComponent,
    PatientManagementComponent,
    EmployeeDetailsComponent
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
