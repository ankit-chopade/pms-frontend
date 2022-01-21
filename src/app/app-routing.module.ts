import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/core/dashboard/layout/layout.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    children:
      [{
        path: '',
        loadChildren: () => import('./modules/core/core.module').then((m) => m.CoreModule)
      }]
  },
  {
    path: '',
    loadChildren: () => import('./modules/default/default.module').then((m) => m.DefaultModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
