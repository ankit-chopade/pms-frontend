import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { StorageService } from '../../common/services/storage.service';
import { formErrorMessages } from '../constant/message.constant';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseController<any>  {

  errormessage = formErrorMessages;
  constructor(private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router, private notifyService: NotificationService, private route: ActivatedRoute) {
    super(formConfig.loginForm, '')
  }

  user: string = "";//"chopadeankit1997@gmail.com"//"singhaniaharshths@gmail.com"//
    // "kvmanish.chaudhary@gmail.com";
  password: string = ""; //"Admin@1234"

  ngOnInit(): void {

  }
  submitloginForm() {

    const param = {
      emailId: this.getControlValue('username'),
      password: this.getControlValue('password')
    }

    this.apiCommonService.login(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          StorageService.setSessionDetails(res['result'])
          this.router.navigate(['../dashboard'])
        }
        else {
          this.notifyService.showError("Invalid Username or Password", "Error");
        }
      },
      (err => {
        this.notifyService.showError(err['error'].message, "");
      })
    )
  }

}









