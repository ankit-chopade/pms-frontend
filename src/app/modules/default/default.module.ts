import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DefaultRoutingModule } from './default-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { DefaultComponent } from './default/default.component';
import { RouterModule } from '@angular/router';
import { NavigationAuthGuardService } from './service/navigationauthguard.service';



@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    PatientRegistrationComponent,
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DefaultRoutingModule,
    RouterModule,
  ],
  providers: [NavigationAuthGuardService]
})
export class DefaultModule 
{
  imgvar:number=1;
  changeimg()
  {
    this.imgvar = (Math.floor(Math.random() * 3) + 1)
  }
  //img var
  
  ngOnInit() 
  {
    //change image of card
    this.changeimg();
     setInterval(() => {this.changeimg();}, 3000);
  }

}
