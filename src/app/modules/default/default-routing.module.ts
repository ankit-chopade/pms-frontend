import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DefaultComponent } from './default/default.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';

const routes: Routes = [
{
   path: '',
   component: DefaultComponent,
   children: [
    { 
      path: 'register', component: PatientRegistrationComponent
    },
    { 
      path: 'forgot', component: ForgotPasswordComponent
    },
    { 
      path: 'change', component: ChangePasswordComponent
    },
    { 
      path: 'login', component: LoginComponent
    }
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class DefaultRoutingModule {
  constructor(){
  }

 }
