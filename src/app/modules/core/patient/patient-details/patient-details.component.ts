import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { formErrorMessages } from 'src/app/modules/default/constant/message.constant';
import { FormUtilServie } from '../../service/form-util.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent  extends FormBaseController<any>{

  errormessage = formErrorMessages;
  allergy_details:string="false";
  constructor(private formConfig: FormUtilServie){
    super(formConfig.patientDetailsForm);
  }

  

submitPatientDetailsForm()
{

  alert("Patient Details Submitted.");
}



}
