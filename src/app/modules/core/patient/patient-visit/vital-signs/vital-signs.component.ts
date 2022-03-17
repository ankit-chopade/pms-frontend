import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { formErrorMessages } from '../../constants/message.constant';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';

@Component({
  selector: 'app-vital-signs',
  templateUrl: './vital-signs.component.html',
  styleUrls: ['./vital-signs.component.scss'],
})
export class VitalSignsComponent
  extends FormBaseController<any>
  implements OnInit
{
  errorMessages = formErrorMessages
  disabled: boolean = false;
  // updateDisable: boolean = true;
  // saveDisabled:boolean = false;
  // editDisable:boolean = false;
  vitalId: number = 0;

  //appointmentId: number = 2; //Static Value
  appointmentId: number 

  isEdit:boolean=true
  action:string;

  constructor(
    private formConfig: FormUtilService,
    private apiCommonService: ApiService,
    private notifyService: NotificationService,
    private route:ActivatedRoute,
    private router: Router

  ) {
    super(formConfig.vitalSignsForm);
  }

  ngOnInit(): void {
    

    if(this.route.snapshot.params["id"]!=undefined){
      let id:any =this.route.snapshot.params["id"]
      let action:any =this.route.snapshot.params["action"]

      console.log(id +"Fetched")
    
      this.appointmentId=id
      this.action=action
      if(this.action=="view"){
        this.isEdit=false;
      }
      else{
        this.isEdit=true;
      }

    }

    this.loadData(this.appointmentId);
  }

  loadData(appointmentId: number) {
    const param = {
      id: appointmentId,
    };
    this.apiCommonService.getVitalSigns(param).subscribe((res) => {
      if (res && res['result'] != null) {
        this.setControlValue('height', res['result'].height);
        this.setControlValue('weight', res['result'].weight);
        this.setControlValue('bloodPressure', res['result'].bloodPressure);
        this.setControlValue('bodyTemperature', res['result'].bodyTemperature);
        this.setControlValue('respirationRate', res['result'].respirationRate);
        this.vitalId = res['result'] .vitalId;
        // this.vitalId = 10;
        this.disabled = true;
        // this.saveDisabled = true;
        // this.editDisable = false;
      } else {
        this.disabled = false;
        // this.saveDisabled = true;
        // this.editDisable = true;
      }
    });
  }

  saveVitalSignsClick() {
    this.disabled = true;
    const param = {
      vitalId: this.vitalId,
      appointmentId: this.appointmentId,
      height: +this.getControlValue('height'),
      weight: +this.getControlValue('weight'),
      bloodPressure: this.getControlValue('bloodPressure'),
      bodyTemperature: this.getControlValue('bodyTemperature'),
      respirationRate: this.getControlValue('respirationRate'),
    };
    this.apiCommonService.saveVitalDetails(param).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.notifyService.showSuccess("Vital Signs added successfully", "Success");
      } else {
        this.notifyService.showError("Vital signs not saved", "Error");
      }
    });

  }
  editButtonClick(){
    // if(this.disabled == true){
      // this.updateDisable = false;
      // console.log(this.disabled);
      this.disabled = false;
    
  }

  updateVitalSignClick() {
    const param = {
      vitalId: this.vitalId,
      appointmentId: this.appointmentId,
      height: this.getControlValue('height'),
      weight: this.getControlValue('weight'),
      bloodPressure: this.getControlValue('bloodPressure'),
      bodyTemperature: this.getControlValue('bodyTemperature'),
      respirationRate: this.getControlValue('respirationRate'),
    };
    this.apiCommonService.updateVitalDetails(param).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.notifyService.showSuccess("Vital Signs updated successfully", "Success");
        // this.updateDisable = true;
      } else {
        this.notifyService.showError("Vital signs not updated", "Error");
      }
    });
  }

  roundOffWeight(){
    if(this.getControlValue('weight')){
      const value = Number(this.getControlValue('weight')).toFixed(2);
      this.setControlValue('weight', value);
    }
  }

  nextButtonClick(){
    this.router.navigate(['../dashboard/patient/diagnosis/',this.action,this.appointmentId],{
      skipLocationChange:true
  });
  }
}
