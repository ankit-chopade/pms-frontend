import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
form_user:number=1;
  // Forgot Password
forgot_email:string="";
forgotPassword_formgrp : FormGroup = new FormGroup({
  forgot_email :  new FormControl("", Validators.email),
 },
  
);

submitforgotPassword()
{

}


}
