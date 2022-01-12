import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { FormUtilServie } from '../service/form-util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends FormBaseController<any>{

   flag_pwd:boolean=true;
  // password_reg:string="";
  // confirmPassword_reg:string="";
  // form_user:number=1;
  // //change password
  // change_email:string="";
  // password_change_pwd:string="";
  // confirmPassword_change_pwd:string="";
  constructor(private formConfig:FormUtilServie){
    super(formConfig.changePassForm,'')
  }


  submitchangePassword()
  {
      //  let email= this.changepassword_formgrp.controls["change_email"].value
  }

  checkpwd()
  {
     if(this.getControlValue('password_change_pwd') ==this.getControlValue('confirmPassword_change_pwd'))
     {
       this.flag_pwd =true;
     }
     else{
      this.flag_pwd=false;
    }
  }

}
