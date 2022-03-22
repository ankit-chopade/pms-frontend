import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { StorageService } from '../../common/services/storage.service';
import { formErrorMessages } from '../constant/message.constant';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';
import { NotificationService } from '../service/notification.service';
import { AppService } from '../../common/services/timeout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormBaseController<any> {
  errormessage = formErrorMessages;
  constructor(
    private formConfig: FormUtilServie,
    private apiCommonService: ApiService,
    private router: Router,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    super(formConfig.loginForm, '');
  }

  user: string = "";//"chopadeankit1997@gmail.com"//"singhaniaharshths@gmail.com"//
    // "kvmanish.chaudhary@gmail.com";
  password: string = ""; //"Admin@1234"
  returnUrl: string;

  ngOnInit(): void {
    // this.appService.setUserLoggedIn(false);
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../dashboard';
    this.clearFormControls(); 
  }

  submitloginForm() {
    const param = {
      emailId: this.getControlValue('username'),
      password: this.getControlValue('password'),
    };

    if (param.password === 'Password@123') {
      this.router.navigateByUrl('/change');
    } else {
      this.apiCommonService.login(param).subscribe(
        (res) => {
          if (res && res['result'] && res['status'] === 200) {
            StorageService.setSessionDetails(res['result']);
            this.appService.setUserLoggedIn(true);
            if (sessionStorage.getItem('roleId') == '5') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../dashboard/inbox/patient-inbox';
              this.router.navigate([this.returnUrl]);
            } else if (sessionStorage.getItem('roleId') == '4') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../dashboard/inbox/nurse-inbox';
              this.router.navigate([this.returnUrl]);
            } else if (sessionStorage.getItem('roleId') == '3') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../dashboard/inbox/physician-inbox';
              this.router.navigate([this.returnUrl]);
            } else if (sessionStorage.getItem('roleId') == '2') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '../dashboard/admin'
              this.router.navigate([this.returnUrl]);
            } else {
              this.notifyService.showError(
                'Please try after some time',
                'Error'
              );
            }
          } else {
            this.notifyService.showError(
              'Invalid Username or Password',
              'Error'
            );}
          }
            );
      password: this.getControlValue('password');

    }
  }

  clearFormControls(){
    this.form.reset();
    this.form.get("username")?.setErrors(null);
    this.form.get("password")?.setErrors(null);
  }
}
