import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedViewComponent } from './modules/common/unauthorized-view/unauthorized-view.component';
import { LayoutComponent } from './modules/core/dashboard/layout/layout.component';
import { NavigationAuthGuardService } from './modules/default/service/navigationauthguard.service';
const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    children:
      [{
        path: '',
        loadChildren: () => import('./modules/core/core.module').then((m) => m.CoreModule), 
        canActivate: [NavigationAuthGuardService]
      }]
  },
  {
    path: '',
    loadChildren: () => import('./modules/default/default.module').then((m) => m.DefaultModule)
  },
  {
    path:'unauthorized',
    component: UnauthorizedViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NavigationAuthGuardService]
})
export class AppRoutingModule { }
