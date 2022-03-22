import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DayAndDate } from '../model/DayAndDate';
import { PatientAppointment } from '../model/patientappointment';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-nurse-inbox',
  templateUrl: './nurse-inbox.component.html',
  styleUrls: ['./nurse-inbox.component.scss'],
  providers: [DatePipe],
})
export class NurseInboxComponent implements OnInit {
  userId: number;
  nextDay: number = 0;
  selected: Date = new Date();
  patientname: string;
  visitDate: Date = new Date();
  constructor(
    private apiCommonService: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  patientData: PatientAppointment[] = [];
  dataSource: any[];
  ngOnInit(): void {
    //this.getDayAndDate()
    this.patientname =
      sessionStorage.getItem('firstName') +
      ' ' +
      sessionStorage.getItem('lastName');
    this.userId = Number(sessionStorage.getItem('userId'));
    this.getAppointmentByDate();
  }

  getAppointmentByDate() {
    console.log('selected date');
    console.log('generated date');
    let selectedDate: Date = this.selected;

    const customDate: string = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate() + 1
    )
      .toISOString()
      .replace('T', ' ');
    console.log(customDate);
    this.userId = Number(sessionStorage.getItem('userId'));
    console.log(this.userId);

    const param = {
      date: customDate,
      patientId: this.userId,
    };
    this.apiCommonService
      .getAppointmentDetailsToPatient(param)
      .subscribe((resp) => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          // console.log(this.dataSource);
        }
      });
  }

  goToVisit(appointmentId: number) {
    this.router.navigate(
      ['../dashboard/patient/vital-signs/edit', appointmentId],
      {
        skipLocationChange: true,
      }
    );
  }

  goToPatientDetails(patientId: number) {
    this.router.navigate(
      ['../dashboard/patient/patient-details/', patientId],
      {
        skipLocationChange: true,
      }
    );
  }

  compareDate(appointmentDate: Date) {
    let date = this.datePipe.transform(appointmentDate, 'yyyy-MM-dd');
    let todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return date == todayDate;
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
