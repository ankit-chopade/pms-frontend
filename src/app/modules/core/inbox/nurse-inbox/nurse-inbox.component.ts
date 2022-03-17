import { Component, OnInit } from '@angular/core';
import { DayAndDate } from '../model/DayAndDate';
import { PatientAppointment } from '../model/patientappointment';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-nurse-inbox',
  templateUrl: './nurse-inbox.component.html',
  styleUrls: ['./nurse-inbox.component.scss']
})
export class NurseInboxComponent implements OnInit {
  userId: number;
  nextDay: number=0;
  selected: Date = new Date();
  patientname: string;
  constructor(private apiCommonService: ApiService) {
  }
  patientData:PatientAppointment[]=[];
  dataSource:any[];
  ngOnInit(): void {
    //this.getDayAndDate()
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
    this.apiCommonService.getAppointmentDetailsToPatient(param).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          console.log(this.dataSource);
        }


      })
      
  }

  // getDayAndDate(){
  //  let currentDate: Date= new Date();
   
  //   for (let index = 0; index < 7; index++) {
  //     let dayAndDate= new DayAndDate();
  //     let date=currentDate.setDate(currentDate.getDate()+this.nextDay);
  //     this.nextDay=+1;
     
  //     console.log(date)
  //     let newDate:Date=new Date(date);
  //     dayAndDate.date=newDate
  //     console.log(dayAndDate)
  //     dayAndDate.day=this.days[newDate.getDay()]
  //       console.log(dayAndDate);
  //     this.dayAndDateList.push(dayAndDate);      
  //   }

  //   console.log(this.dayAndDateList)
    
  // }

}
