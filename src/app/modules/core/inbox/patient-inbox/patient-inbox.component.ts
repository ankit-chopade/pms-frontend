import { Component, OnInit } from '@angular/core';
import { DayAndDate } from '../model/DayAndDate';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-patient-inbox',
  templateUrl: './patient-inbox.component.html',
  styleUrls: ['./patient-inbox.component.scss']
})
export class PatientInboxComponent implements OnInit {
  layout: any[];
  userId: number;
  dayAndDateList: any[]=[];
  days:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  nextDay: number=0;

  constructor(private apiCommonService: ApiService) {
    const today = new Date();
   // this.layout = [...Array(7).keys()].map(i => days[(i + today.getDay()) % days.length],today.getDate());
    //this.layout[this.layout.length - 1] = this.layout[this.layout.length - 1];
    
  }

  displayedColumns: string[] = ['AppointmentID', 'MeetingTitle', 'Description', 'Day', 'Time'];
  dataSource:any[];
  ngOnInit(): void {
    this.getDayAndDate()
    this.userId= Number(sessionStorage.getItem('userId'))
    console.log(this.userId)
    console.log(this.layout)
    // const customDate: string=new Date().toISOString().replace('T',' '); 
    // const param = {
    //   date: customDate
    // };
    // this.apiCommonService.getAppointmentDetailsToPatient(param).subscribe(
    //   resp => {
    //     if (resp['status'] === 200 && resp['result'] && resp != null) {
    //       this.dataSource = resp['result'];
    //       console.log(this.dataSource);
    //     }


    //   })

  }
  getAppointmentByDate(date:Date){
    console.log(date)
  //  const customDate: string=new Date().toISOString().replace('T',' '); 
    const customDate: string=date.toISOString().replace('T',' '); 

    const param = {
      date: customDate
    };
    this.apiCommonService.getAppointmentDetailsToPatient(param).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          console.log(this.dataSource);
        }


      })
      
  }

  getDayAndDate(){
   let currentDate: Date= new Date();
   
    for (let index = 0; index < 7; index++) {
      let dayAndDate= new DayAndDate();
      let date=currentDate.setDate(currentDate.getDate()+this.nextDay);
      this.nextDay=+1;
     
      console.log(date)
      let newDate:Date=new Date(date);
      dayAndDate.date=newDate
      console.log(dayAndDate)
      dayAndDate.day=this.days[newDate.getDay()]
        console.log(dayAndDate);
      this.dayAndDateList.push(dayAndDate);      
    }

    console.log(this.dayAndDateList)
    
  }
  // response starttime -> new Date(starteTime).getDay() -> 2
  // 
}
