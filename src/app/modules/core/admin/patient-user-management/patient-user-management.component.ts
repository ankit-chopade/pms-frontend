import { Component, OnInit } from '@angular/core';
import { formErrorMessages } from '../../patient/constants/message.constant';

@Component({
  selector: 'app-patient-user-management',
  templateUrl: './patient-user-management.component.html',
  styleUrls: ['./patient-user-management.component.scss']
})
export class PatientUserManagementComponent implements OnInit {

  constructor() { }
  errormessage = formErrorMessages;
  ngOnInit(): void {

    
  }

}
