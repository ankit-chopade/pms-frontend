import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';

import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { formErrorMessages } from '../../constants/message.constant';
import { Employee } from '../../models/EmployeeRegistration';

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
  password:string="";
  confirmpassword:string="";
  employee :Employee ={
    title: '',
    firstName: '',
    lastName: '',
    dob: '',
    emailId: '',
    employeeId: 0,
    roleId:0
  }
  constructor(private formConfig: FormUtilsService, private apiCommonService: ApiService, private router: Router,private notifyService : NotificationService,) 
    { 
      super(formConfig.registrationForm, '');
    }
   

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
     
  
  }
  submitregistrationForm(){
      let role= this.getControlValue('role');
      if(role=='admin')
      {
        this.roleId=2
      }
      else if(role=='doctor')
      {
        this.roleId=3
      }
      else{
        this.roleId=4
      }
      
      this.employeeId= this.getControlValue('employeeId');
      
      const param = {
        title: this.getControlValue('title'),
        firstName: this.getControlValue('firstname'),
        lastName: this.getControlValue('lastname'),
        dob: this.getControlValue('dob'),
        emailId: this.getControlValue('emailid'),
        employeeId : this.getControlValue('employeeId'),
        contactNumber: this.getControlValue('contactnumber'),
        roleId:this.roleId,
        active:1,
      }
     this.employee = param;
     this.apiCommonService.employeeRegistration(this.employee).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
              this.notifyService.showSuccess("Employee registered successfully.","Success")     
        }
        else {
          this.notifyService.showError("Employee registeration failed","Error")     

        }
      }
    );
    console.log(this.employee);
    
   
  }
 
}
