import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-management/employee-details/employee-details.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeRegistrationComponent } from './employee-management/employee-registration/employee-registration.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';



const routes: Routes = [
    
    {
      path: 'patient-management',
      component:PatientManagementComponent
    },
   
  {
    path : 'employee-management',
    component: EmployeeManagementComponent,
    children: [
       {
         path: '', redirectTo: 'employee-details', pathMatch: 'full'
       },
    {
      path: 'employee-registration',
    
      component: EmployeeRegistrationComponent
    },
    {
      path: 'employee-details',
      component: EmployeeDetailsComponent 
    },
   ]
  }  
  
];

 


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule {
  constructor(){
  }

 }