import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { formErrorMessages } from '../constant/message.constant';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends FormBaseController<any>{

   flag_pwd:boolean=true;
   errormessage = formErrorMessages;

   constructor(private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router,private notifyService : NotificationService) {
    super(formConfig.changePasswordForm,'')
  }


  submitchangePassword()
  {
    const param = {
      emailId: this.getControlValue('username'),
      oldPassword: this.getControlValue('oldpassword'),
      newPassword: this.getControlValue('password'),

    }

    this.apiCommonService.changePassword(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          sessionStorage.setItem('roleId', res.result["roleId"]);
          this.notifyService.showSuccess("Your Password has been changed successfully","Success")
          this.router.navigate(['../login'])
        }
        else {
          this.notifyService.showError("Please try again","Error")
          // console.log("Login Failed")
        }
      })
  }

  checkpwd()
  {
     if(this.getControlValue('password') ==this.getControlValue('confirmpassword'))
     {
       this.flag_pwd =true;
     }
     else{
      this.flag_pwd=false;
    }
  }

}
