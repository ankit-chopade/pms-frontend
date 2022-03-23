import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from '../../default/service/admin-auth-guard-service.service';
import { NurseAuthGuardService } from '../../default/service/nurse-auth-guard-service.service';
import { PatientAuthGuardService } from '../../default/service/patient-auth-guard-service.service';
import { PatientPhysicianNurseAuthGuardService } from '../../default/service/patient-physician-nurse-auth-guard-service';
import { PhysicianAuthGuardService } from '../../default/service/physician-auth-guard-service.service';
import { PhysicianNurseAuthGuardService } from '../../default/service/physician-nurse-auth-guard-service';
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
    path: 'details/:userId',
    component: PatientPortalDetailsComponent,
    canActivate: [PhysicianNurseAuthGuardService]
  },
  {
    path: 'portal-screen',
    component: PatientPortalScreenComponent,
    canActivate: [PhysicianNurseAuthGuardService]
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent,
    canActivate: [PatientAuthGuardService]
  },  
  {
    path: 'patient-details/:id',
    component: PatientDetailsComponent,
    canActivate: [PatientPhysicianNurseAuthGuardService]
  },
  {
    path: 'visit-history',
    component: VisitHistoryComponent,
    canActivate: [PatientAuthGuardService]
  },
  {
    path: 'vital-signs/:action/:id',
    component: VitalSignsComponent,
    canActivate: [PatientPhysicianNurseAuthGuardService]
  },
  {
    path: 'diagnosis/:action/:id',
    component: DiagnosisComponent,
    canActivate: [PatientPhysicianNurseAuthGuardService]
  },
  {
    path: 'medications/:action/:id',
    component: MedicationsComponent,
    canActivate: [PatientPhysicianNurseAuthGuardService]
  },
  {
    path: 'procedures/:action/:id',
    component: ProcedureComponent,
    canActivate: [PatientPhysicianNurseAuthGuardService]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PatientRoutingModule {
  constructor() {
  }

}
