import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { formErrorMessages } from '../../patient/constants/message.constant';
import { ApiService } from '../../patient/service/api.service';
import { FormUtilService } from '../../patient/service/form-util.service';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent extends FormBaseController<any>{
  errormessage = formErrorMessages;
  maxDate:Date=new Date();
  constructor(private formConfig: FormUtilService, private apiCommonService: ApiService, private router: Router,private notifyService : NotificationService) 
    { 
       super(formConfig.employeeRegistrationForm, '')
      
    }
  
  

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  submitregistrationForm(){

  }
}
