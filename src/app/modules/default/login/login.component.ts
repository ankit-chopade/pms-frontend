import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { formErrorMessages } from '../constant/message.constant';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseController<any> {

  errormessage = formErrorMessages;
  constructor(private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router) {
    super(formConfig.loginForm, '')
  }
  ngOnInit(): void {

  }
  submitloginForm() {

    const param = {
      firstName: this.getControlValue('username'),
      password: this.getControlValue('password')
    }

    this.apiCommonService.login(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          console.log(res)
          sessionStorage.setItem('roleId', res.result["roleId"])
          console.log(sessionStorage)
          this.router.navigate(['../dashboard'])
        }
        else {
          console.log("Login Failed")
        }
      })
  }
}









