import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllergyManagementComponent } from './allergy-management/allergy-management.component';
import { DiagonsisManagementComponent } from './diagonsis-management/diagonsis-management.component';
import { EmployeeDetailsComponent } from './employee-management/employee-details/employee-details.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { EmployeeRegistrationComponent } from './employee-management/employee-registration/employee-registration.component';
import { MedicationManagementComponent } from './medication-management/medication-management.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { ProcedureManagementComponent } from './procedure-management/procedure-management.component';



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
  } ,
  {
    path: 'diagonosis-management',
    component:DiagonsisManagementComponent
  },
  {
    path: 'medication-management',
    component:MedicationManagementComponent
  },
  {
    path: 'procedure-management',
    component:ProcedureManagementComponent
  },
  {
    path: 'allergy-management',
    component:AllergyManagementComponent
  },
];

 


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule {
  constructor(){
  }

 }