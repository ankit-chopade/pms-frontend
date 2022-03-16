import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { DiagnosisComponent } from './patient-visit/diagnosis/diagnosis.component';
import { MedicationsComponent } from './patient-visit/medications/medications.component';
import { PatientDemographicsDetailsComponent } from './patient-visit/patient-demographics-details/patient-demographics-details.component';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { ProcedureComponent } from './patient-visit/procedure/procedure.component';
import { VitalSignsComponent } from './patient-visit/vital-signs/vital-signs.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent,
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent,
  },
  {
    path: 'patient-visit',
    component: PatientVisitComponent,
    children: [
      {
        path: '',
        redirectTo: 'vital-signs',
        pathMatch: 'full',
      },
      {
        path: 'diagnosis',
        // loadChildren: () => import('./patient-visit/diagnosis/').then((m) => m.DiagnosisComponent)
        component: DiagnosisComponent,
      },
      {
        path: 'patient-details',
        component: PatientDemographicsDetailsComponent,
      },
      {
        path: 'procedures',
        component: ProcedureComponent,
      },
      {
        path: 'vital-signs',
        component: VitalSignsComponent,
      },
      {
        path: 'medications',
        component: MedicationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule {
  constructor() {}
}
