import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { data } from 'jquery';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    private service: ApiService,
    private notifyService: NotificationService,
    private router: Router
  ) {}
  public patients: any[];
  public patient_block: any[];
  public patient_inactive: any[];
  public patient_active: any[];
  public patient_block_count: number = 0;
  public patient_inactive_count: number = 0;
  public patient_active_count: number = 0;
  public chart2: Chart;
  public usersData:any[];
  public usersData_custom:any[]=[0,0,0,0,0,0,0,0,0,0,0,0];
  barChart :Chart;

  ngOnInit(): void {
    this.loadPatientDetails();
    this.getMonthlyData();
  }

  public loadPatientDetails() {
    this.service.patientDetails().subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.patients = res['result'];
        this.patient_block = this.patients.filter(
          (data: { activeStatus: number }) => data.activeStatus == 2
        );
        this.patient_inactive = this.patients.filter(
          (data: { activeStatus: number }) => data.activeStatus == 0
        );
        this.patient_active = this.patients.filter(
          (data: { activeStatus: number }) => data.activeStatus == 1
        );
        this.patient_block_count = this.patient_block.length;
        this.patient_inactive_count = this.patient_inactive.length;
        this.patient_active_count = this.patient_active.length;
        this.getGraphicalInfoOfPatientCount();
      }
    });
  }

  public getMonthlyData(){
    this.service.monthlyData().subscribe((res)=>{
      if (res && res['result'] && res['status'] === 200) {
        this.usersData = res['result'];
        this.usersData = this.usersData.map(data=> [data.id=data.id,data.name= new Date(data.name)]);
        this.usersData.forEach((value)=>{
          for(let i=0;i<12;i++){
              if(value[1].getMonth()==i){
                this.usersData_custom[i]=value[0]
              }
          }
        })
        this.barChart = new Chart(this.stackedBar());
      }

    });
  }
  getGraphicalInfoOfPatientCount() {
    let pieChartData: any = [
      {
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'Patient Counts',
        data: [
          {
            name: 'Active',
            y: this.patient_active_count,
          },
          {
            name: 'Inactive',
            y: this.patient_inactive_count,
          },
          {
            name: 'Blocked',
            y: this.patient_block_count,
          },
        ],
      },
    ];
    let chart2 = new Chart({
      chart: {
        type: 'pie',
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        description: 'A variable radius pie chart compares ...',
      },
      title: {
        text: 'Total No Of Patients : <b>' + this.patients.length + '<b>',
      },
      tooltip: {
        headerFormat: '',
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Patients: <b>{point.y}</b><br/>',
      },
      series: pieChartData,
    });
    this.chart2 = chart2;
    // this.chart3 = chart2;
  }

  stackedBar():any{
    const barChart: Options = {
      chart: {
        type: 'bar',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: 'Monthly User Registration',
      },
      yAxis: {
        visible: false,
        gridLineColor: '#fff',
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        lineColor: '#fff',
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    
      plotOptions: {
        series: {
          borderRadius: 5,
        } as any,
      },
    
      series: [
        {
          type: 'bar',
          color: '#506ef9',
          data: [
            { y: this.usersData_custom[0]},
            { y: this.usersData_custom[1] },
            { y: this.usersData_custom[2] },
            { y: this.usersData_custom[3] },
            { y: this.usersData_custom[4], color: '#ffe8df' },
            { y: this.usersData_custom[5] },
            { y: this.usersData_custom[6] },
            { y: this.usersData_custom[7] },
            { y: this.usersData_custom[8], color: '#fc5185' },
            { y: this.usersData_custom[9] },
            { y: this.usersData_custom[10] },
            { y: this.usersData_custom[11] },
          ],
        },
      ],
    };
    return barChart;
  }

}
