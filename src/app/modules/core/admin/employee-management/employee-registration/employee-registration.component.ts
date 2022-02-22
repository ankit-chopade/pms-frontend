import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';

import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { formErrorMessages } from '../../constants/message.constant';

import { ApiService } from '../../service/api.service';
import { FormUtilsService } from '../../service/form-util-service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent extends FormBaseController<any> implements OnInit {

  errormessage = formErrorMessages;
  maxDate:Date=new Date();
  role:string;
  roleId:number;
  employeeId:number;
  constructor(private formConfig: FormUtilsService, private apiCommonService: ApiService, private router: Router,private notifyService : NotificationService,) 
    { 
      super(formConfig.registrationForm, '');
    }
   

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }
  submitregistrationForm(){
    role: this.getControlValue('role');
    if(this.role=='admin')
    {
alert("Admin Already exists you cannot create more admin");
    }
    else{
      if(this.role=='doctor')
      {
        this.roleId=3
      }
      else{
        this.roleId=4
      }
    }
    this.employeeId= this.getControlValue('employeeId');
    
    const param = {
      title: this.getControlValue('title'),
      firstName: this.getControlValue('firstname'),
      lastName: this.getControlValue('lastname'),
      dob: this.getControlValue('dob'),
      emailId: this.getControlValue('emailid'),
      roleId:this.roleId,
      active:1,
    }
  }
}
