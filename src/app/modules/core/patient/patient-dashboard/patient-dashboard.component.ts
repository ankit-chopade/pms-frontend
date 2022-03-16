import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../service/api.service';
import { FormUtilService } from '../service/form-util.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent extends FormBaseController<any> implements OnInit {

  constructor(private formConfig: FormUtilService, private apiCommonService: ApiService) {
    super(formConfig.dashboardPatient);
   }

  bpList: any[] =[];
  sBPList : number[] = [];
  dBpList : number[] = [];
  respirationList: number[] = [];

  height: number;
  weight: number;
  temperature: number;
  pulse : number;

  chart: Chart;
  chart2: Chart;

  patientId = sessionStorage.getItem('userId');
  // patientId = 1;

  ngOnInit(): void {
    this.getRespirationRateData();
    this.getBloodPressureData();
    this.getVitalDetails();
  }

  getBloodPressureData(){
    const param = {
      id: this.patientId
    };

    this.apiCommonService.getBloodPressureList(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.bpList = res['result'];
          this.getSbpAndDbpFromList(this.bpList);
          this.getGraphicalInfoOfPatientForBP();
        }
      }
    );
  }

  getSbpAndDbpFromList(bpList: any[]) {
    bpList.forEach( bp => { 
      let temp : string[] = bp.split('/');
      this.sBPList.push(Number(temp[0]));
      this.dBpList.push(Number(temp[1]));
    });
  }

  getRespirationRateData() {
    const param = {
      id : this.patientId
    }

    this.apiCommonService.getRespirationList(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          let data :string[] = res['result'];
          data.forEach(element => {
            this.respirationList.push(Number(element));
          });
          this.getGraphicalInfoOfPatientForRR();
        }
      }
    );
  }

  getGraphicalInfoOfPatientForBP(){
    let chart = new Chart({
      title: {
        text: 'Blood Pressure'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'line',
        name: 'Systolic BP',
        data: this.sBPList
      },
    {
      type: 'line',
        name: 'Diastolic BP',
        data: this.dBpList
    }]
    });
    this.chart = chart;

  }
  getGraphicalInfoOfPatientForRR(){

    let chart2 = new Chart({
      title: {
        text: 'Respiration In BPM'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'line',
        name: 'Respiration rate',
        data: this.respirationList
      }]
    });
    this.chart2 = chart2;
  }

  getVitalDetails() {
    const param = {
      id:this.patientId
    }
    this.apiCommonService.getLatestVitalSigns(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.height = res['result'].height;
          this.pulse = res['result'].respirationRate;
          this.weight = res['result'].weight;
          this.temperature = res['result'].bodyTemperature;
        }
      }
    );
  }
}
