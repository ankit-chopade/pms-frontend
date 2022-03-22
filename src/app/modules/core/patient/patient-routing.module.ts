import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from '../../default/service/admin-auth-guard-service.service';
import { PatientAuthGuardService } from '../../default/service/patient-auth-guard-service.service';
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
    canActivate: [PatientAuthGuardService]
  },
  {
    path: ':details/:userId',
    component: PatientPortalDetailsComponent,
    canActivate: [!PatientAuthGuardService && !AdminAuthGuardService]
  },
  {
    path: 'portal-screen',
    component: PatientPortalScreenComponent,
    canActivate: [!PatientAuthGuardService && !AdminAuthGuardService]
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent,
    canActivate: [!AdminAuthGuardService]
  },  
  {
    path: 'visit-history',
    component: VisitHistoryComponent,
    canActivate: [PatientAuthGuardService]
  },
  {
    path: 'vital-signs/:action/:id',
    component: VitalSignsComponent,
    canActivate: [!AdminAuthGuardService]
  },
  {
    path: 'diagnosis/:action/:id',
    component: DiagnosisComponent,
    canActivate: [!AdminAuthGuardService]
  },
  {
    path: 'medications/:action/:id',
    component: MedicationsComponent,
    canActivate: [!AdminAuthGuardService]
  },
  {
    path: 'procedures/:action/:id',
    component: ProcedureComponent,
    canActivate: [!AdminAuthGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule {
  constructor() {
  }

}
