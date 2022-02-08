import { Component, Input, OnInit } from '@angular/core';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.scss']
})
export class VitalSignsComponent extends FormBaseController<any> implements OnInit {
  @Input() appointmentId:number = 0;
  disabled: boolean = false;

  constructor(private formConfig: FormUtilService, private apiCommonService: ApiService) { 
    super(formConfig.vitalSignsForm)
  }

  ngOnInit(): void {
    this.loadData(this.appointmentId);
  }

  loadData(appointmentId: number){
    const param = {
      appointmentId:appointmentId
    }
    this.apiCommonService.getVitalSigns(param).subscribe(
      res => {
        if(res && res['result']!= null){
          this.setControlValue('height', res['result'].height);
          this.setControlValue('weight', res['result'].weight);
          this.setControlValue('bloodPressure', res['result'].bloodPressure);
          this.setControlValue('bodyTemperature', res['result'].bodyTemperature);
          this.setControlValue('respirationRate', res['result'].respirationRate); 
          this.disabled = true;
        }
        else{
          this.disabled = false
        }
      }
    );
  }

  saveVitalSignsClick(){

    const param = {
      appointmentId: this.appointmentId,
      height: this.getControlValue('height'),
      weight: this.getControlValue('weight'),
      bloodPressure: this.getControlValue('bloodPressure'),
      bodyTemperature: this.getControlValue('bodyTemperature'),
      respirationRate: this.getControlValue('respirationRate'),
    }
    this.apiCommonService.saveVitalDetails(param).subscribe(
      res => {
        // notification to save 
      }
    );
  }


}
