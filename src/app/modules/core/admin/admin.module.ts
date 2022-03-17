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
import { AllergyManagementComponent } from './allergy-management/allergy-management.component';
import { MedicationManagementComponent } from './medication-management/medication-management.component';
import { ProcedureManagementComponent } from './procedure-management/procedure-management.component';
import { MadicationDialogComponent } from './medication-management/madication-dialog/madication-dialog.component';
import { ProcedureDialogComponent } from './procedure-management/procedure-dialog/procedure-dialog.component';
import { AllergyDetailsDialogComponent } from './allergy-management/allergy-details-dialog/allergy-details-dialog.component';
import { DiagnosisDialogComponent } from './diagnosis-management/diagnosis-dialog/diagnosis-dialog.component';
import { DiagnosisManagementComponent } from './diagnosis-management/diagnosis-management.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [
    EmployeeManagementComponent,
    EmployeeRegistrationComponent,
    PatientManagementComponent,
    EmployeeDetailsComponent,
    AllergyManagementComponent,
    DiagnosisManagementComponent,
    MedicationManagementComponent,
    ProcedureManagementComponent,
    DiagnosisDialogComponent,
    MadicationDialogComponent,
    ProcedureDialogComponent,
    AllergyDetailsDialogComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ChartModule
  ]
})
export class AdminModule { }
