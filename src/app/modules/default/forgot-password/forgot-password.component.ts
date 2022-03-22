import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { formErrorMessages } from '../constant/message.constant';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends FormBaseController<any>{
  errormessage = formErrorMessages;

  constructor(private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router,private notifyService : NotificationService) {
    super(formConfig.forgotPasswordForm, '')
  }

submitforgotPassword()
{
  const param = {
    emailId: this.getControlValue('username'),
  }
  this.apiCommonService.forgotPassword(param).subscribe(
    res => {
      if (res && res['result'] && res['status'] === 200) {
        this.notifyService.showSuccess("Password has been sent on your EmailId","Success")
        this.router.navigate(['../'])
      }
      else {
        this.notifyService.showError("Please try again","Error")
      }
    })
}


}
