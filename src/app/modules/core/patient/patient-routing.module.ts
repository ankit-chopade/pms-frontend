import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientPortalDetailsComponent } from './patient-portal-details/patient-portal-details.component';
import { PatientPortalScreenComponent } from './patient-portal-screen/patient-portal-screen.component';
import { DiagnosisComponent } from './patient-visit/diagnosis/diagnosis.component';
import { MedicationsComponent } from './patient-visit/medications/medications.component';
import { ProcedureComponent } from './patient-visit/procedure/procedure.component';
import { VitalSignsComponent } from './patient-visit/vital-signs/vital-signs.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardComponent,
  },
  {
    path: ':details/:userId',
    component: PatientPortalDetailsComponent,
  },
  {
    path: 'portal-screen',
    component: PatientPortalScreenComponent,
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent,
  },  
  {
    path: 'visit-history',
    component: VisitHistoryComponent
  },
  {
    path: 'vital-signs/:action/:id',
    component: VitalSignsComponent
  },
  {
    path: 'diagnosis/:action/:id',
    component: DiagnosisComponent
  },
  {
    path: 'medications/:action/:id',
    component: MedicationsComponent
  },
  {
    path: 'procedures/:action/:id',
    component: ProcedureComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule {
  constructor() {
  }

}
