import { Component, OnInit } from '@angular/core';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';

@Component({
  selector: 'app-patient-demographics-details',
  templateUrl: './patient-demographics-details.component.html',
  styleUrls: ['./patient-demographics-details.component.scss']
})
export class PatientDemographicsDetailsComponent extends FormBaseController<any> implements OnInit {

  disabled: boolean = true;
  errormessage = "";
  allergy_details: string = "false";
  allergydatasource: any[] = [];
  allergycolumns: string[] = ['allergyid', 'allergytype', 'allergyname', 'allergydesc', 'allergyclinicalinfo'];
  constructor(private formConfig: FormUtilService, private apiCommonService: ApiService) {
    super(formConfig.patientDetails);
  }
  editButtonClick(){
    this.disabled = false;
  }
  saveButtonClick(){
    
  }

  ngOnInit(): void {
    this.loadPatientDetails("3");
  }

  submitPatientDetailsForm(){

  }

  loadGrid() {
    // this.allergydatasource = [...this.allergydatasource];
  }

  addAllergies() {

  }
  sameAddres(){

  }

  loadPatientDetails(patientId: string){
    const param = {
      patientId: patientId
    };
    this.apiCommonService.getPatientDetailsForPatientId(param).subscribe(
      res => {
        if(res && res['result']) {
          this.setControlValue("title", res['result'].title);
          this.setControlValue("firstname", res['result'].firstname);
          this.setControlValue("lastname", res['result'].lastname);
          this.setControlValue("dob", res['result'].dob);
          this.setControlValue("age", res['result'].age);
          this.setControlValue("gender", res['result'].gender);
          this.setControlValue("race", res['result'].race);
          this.setControlValue("ethnicity", res['result'].ethnicity);
          this.setControlValue("languages", res['result'].languages);
          this.setControlValue("emailid", res['result'].emailid);
          this.setControlValue("homeaddress", res['result'].homeaddress);
          this.setControlValue("accesstopatientportal", res['result'].accesstopatientportal);
          this.setControlValue("contactnumber", res['result'].contactnumber);
          this.setControlValue("emergencycontactfirstname", res['result'].emergencycontactfirstname);
          this.setControlValue("emergencycontactlastname", res['result'].emergencycontactlastname);
          this.setControlValue("emergencycontactrelation", res['result'].emergencycontactrelation);
          this.setControlValue("emergencycontactemailid", res['result'].emergencycontactemailid);
          this.setControlValue("emergencycontactnumber", res['result'].emergencycontactnumber);
          this.setControlValue("addrsameaspatient", res['result'].addrsameaspatient);
          this.setControlValue("emergencycontacthomeaddress", res['result'].emergencycontacthomeaddress);

          this.setControlValue("allergyFlag", res['result'].allergy_details);
          if(this.getControlValue("allergyFlag") == 'yes')
            this.setControlValue("allergydetails", res['result'].allergydatasource);
        }
      }
    )
  }

}
