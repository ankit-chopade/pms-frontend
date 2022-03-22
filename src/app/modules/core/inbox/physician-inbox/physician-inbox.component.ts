import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { FormUtilService } from '../../patient/service/form-util.service';
import { DayAndDate } from '../model/DayAndDate';
import { PatientAppointment } from '../model/patientappointment';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-physician-inbox',
  templateUrl: './physician-inbox.component.html',
  styleUrls: ['./physician-inbox.component.scss'],
  providers: [DatePipe],
})
export class PhysicianInboxComponent
  extends FormBaseController<any>
  implements OnInit
{
  physicianname: string;
  userId: number;
  AppoinmentData: PatientAppointment[];
  selected: Date = new Date();

  constructor(
    private apiCommonService: ApiService,
    private formConfig: FormUtilService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    super(formConfig.inboxForm);
  }

  patientData: PatientAppointment[] = [];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.physicianname =
      sessionStorage.getItem('firstName') +
      ' ' +
      sessionStorage.getItem('lastName');
    this.userId = Number(sessionStorage.getItem('userId'));
    this.getAppointmentByDate();
  }

  deleteAppointmentsByAppointmentId(id: number) {
    const deleteParam = {
      appointmentId: id,
    };

    this.apiCommonService
      .deleteAppointmentsByAppointmentId(deleteParam)
      .subscribe((resp) => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          this.getAppointmentByDate();
          console.log(this.dataSource);
        }
      });
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
      physicianId: this.userId,
    };

    this.apiCommonService
      .getAppointmentsByDateAndPhysicianId(param)
      .subscribe((resp) => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          console.log(this.dataSource);
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
    this.router.navigate(['../dashboard/patient/patient-details/', patientId], {
      skipLocationChange: true,
    });
  }

  compareDate(appointmentDate: Date) {
    let date = this.datePipe.transform(appointmentDate, 'yyyy-MM-dd');
    let todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return date == todayDate;
  }

  compareFutureDate(appointmentDate: Date) {
    let date: any = this.datePipe.transform(appointmentDate, 'yyyy-MM-dd');
    let todayDate: any = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return date >= todayDate;
  }
}
