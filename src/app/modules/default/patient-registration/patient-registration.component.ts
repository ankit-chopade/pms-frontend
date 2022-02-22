import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBaseController } from '../../common/utility/form-base-controller';
import { formErrorMessages } from '../constant/message.constant';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent extends FormBaseController<any>{

  flag_pwd: boolean = true;
  errormessage = formErrorMessages;
  password: string = "";
  confirmpassword: string = "";
  maxDate: Date = new Date();
  constructor(private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router, private notifyService: NotificationService) {
    super(formConfig.registrationForm, '')
  }




  submitregistrationForm() {
    const param = {
      title: this.getControlValue('title'),
      firstName: this.getControlValue('firstname'),
      lastName: this.getControlValue('lastname'),
      dob: this.getControlValue('dob'),
      emailId: this.getControlValue('username'),
      contactNumber: this.getControlValue('contactnumber'),
      password: this.getControlValue('password'),
      roleId: 5,
      active: 1,
    }

    this.apiCommonService.registration(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.notifyService.showSuccess("Registered Successfully", "Success")
          this.router.navigate(['../login'])
        }
        else {
          this.notifyService.showError("Please try again", "Error")
        }
      },
      (err => {
        this.notifyService.showError(err['error'].message, "");

      })
    )
  }

  confirmExit(): boolean {
    return confirm("Do you wish to leave this page?");
  }

  // checkpwd()
  //   {
  //     if(this.getControlValue('password')=="" && this.getControlValue('confirmpassword')=="")
  //     return false

  //      if(this.getControlValue('password') ==this.getControlValue('confirmpassword'))
  //      {
  //        //this.flag_pwd =true;
  //        return true;
  //      }
  //      else{
  //       //this.flag_pwd=false;
  //       return false;
  //     }
  //   }

}
