import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientRoutingModule } from './patient-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AllergyDetailsDialogComponent } from './patient-details/allergy-details-dialog/allergy-details-dialog.component';
import { AllergyFilterPipe } from './patient-details/search-filter/allergy-filter.pipe';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { PatientProcedureModalDialogComponent } from './patient-visit/procedure/patient-procedure-modal-dialog/patient-procedure-modal-dialog.component';
import { SearchFilterPipe } from './patient-visit/search-filter/search-filter.pipe';
import { DiagnosisComponent } from './patient-visit/diagnosis/diagnosis.component';
import { DiagnosisModalDialogComponent } from './patient-visit/diagnosis/diagnosis-modal-dialog/diagnosis-modal-dialog.component';
import { ProcedureComponent } from './patient-visit/procedure/procedure.component';
import { VitalSignsComponent } from './patient-visit/vital-signs/vital-signs.component';
import { MedicationsComponent } from './patient-visit/medications/medications.component';
import { MedicationsModalDialogComponent } from './patient-visit/medications/medications-modal-dialog/medications-modal-dialog.component';
import { PatientDemographicsDetailsComponent } from './patient-visit/patient-demographics-details/patient-demographics-details.component';
import { ChartModule } from 'angular-highcharts';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientPortalScreenComponent } from './patient-portal-screen/patient-portal-screen.component';
import { PatientPortalDetailsComponent } from './patient-portal-details/patient-portal-details.component';



@NgModule({
  declarations: [
    PatientDetailsComponent,
    AllergyDetailsDialogComponent,
    AllergyFilterPipe,
    PatientVisitComponent,
    PatientProcedureModalDialogComponent,
    SearchFilterPipe,
    DiagnosisComponent,
    DiagnosisModalDialogComponent,
    ProcedureComponent,
    VitalSignsComponent,
    MedicationsComponent,
    MedicationsModalDialogComponent,
    PatientDemographicsDetailsComponent,
    PatientDashboardComponent,
    PatientPortalScreenComponent,
    PatientPortalDetailsComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    ChartModule
  ]
})
export class PatientModule { }
