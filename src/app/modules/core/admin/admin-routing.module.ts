import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeRegistrationComponent } from './employee-registration/employee-registration.component';
import { PatientUserManagementComponent } from './patient-user-management/patient-user-management.component';


const routes: Routes = [
    
    {
      path: 'patient-user-management',
      component:PatientUserManagementComponent
    },
    {
      path: 'employee-registration',
      component:EmployeeRegistrationComponent
    },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule {
  constructor(){
  }

 }