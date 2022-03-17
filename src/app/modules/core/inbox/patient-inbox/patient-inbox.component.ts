import { Component, OnInit } from '@angular/core';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { FormUtilService } from '../../patient/service/form-util.service';
import { DayAndDate } from '../model/DayAndDate';
import { PatientAppointment } from '../model/patientappointment';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-patient-inbox',
  templateUrl: './patient-inbox.component.html',
  styleUrls: ['./patient-inbox.component.scss']
})
export class PatientInboxComponent  extends FormBaseController<any> implements OnInit {
  //matDatepicker: Date;
  //startDate: Date =new Date();
  selected: Date = new Date();
  patientname: string;
  userId: number;

  constructor(private apiCommonService: ApiService, private formConfig:FormUtilService) { 
    super(formConfig.inboxForm)    
  }
  // today = new Date();

  patientData:PatientAppointment[]=[];
  dataSource:any[]=[];
  ngOnInit(): void {
   
    this.patientname=sessionStorage.getItem('firstName') + ' ' 
    + sessionStorage.getItem('lastName');
    this.userId= Number(sessionStorage.getItem('userId'))
    this.getAppointmentByDate();

  }

  getAppointmentByDate(){
    console.log("selected date");
    console.log("generated date");
    let selectedDate : Date = this.selected;
    
    const customDate: string=new Date(selectedDate.getFullYear(),selectedDate.getMonth(), (selectedDate.getDate())+1)
      .toISOString().replace('T',' ');
    console.log(customDate); 
    this.userId= Number(sessionStorage.getItem('userId'))
    console.log(this.userId)

    const param = {
      date: customDate,
      patientId: this.userId
    };
    console.log(param)
    this.apiCommonService.getAppointmentDetailsByDateAndPatientId(param).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          console.log(this.dataSource);
        }
      })
  }
}
