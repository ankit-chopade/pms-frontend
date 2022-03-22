import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from '../default/service/admin-auth-guard-service.service';

const routes: Routes = [
  // {
  //   path: 'user',
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  // },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then((m) => m.PatientModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then((m) => m.InboxModule), //canActivate:[!AdminAuthGuardService]
    
  },
  {
    path: 'scheduling',
    loadChildren: () => import('./scheduling/scheduling.module').then((m) => m.SchedulingModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule), canActivate:[AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CoreRoutingModule {
  constructor(){
    // console.log("core")
  }

 }
