import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { AllergyDetails } from '../models/AllergyDetails';
import { PatientDetails } from '../models/DemographicDetail';
import { PatientAllergy } from '../models/PatientAllergy';
import { User } from '../models/User';
import { ApiService } from '../service/api.service';
import { FormUtilService } from '../service/form-util.service';

@Component({
  selector: 'app-patient-portal-details',
  templateUrl: './patient-portal-details.component.html',
  styleUrls: ['./patient-portal-details.component.scss']
})
export class PatientPortalDetailsComponent extends FormBaseController<any>  implements OnInit  {
  
  
  constructor
  (
    private route:ActivatedRoute,
    private formConfig: FormUtilService,
    private apiCommonService: ApiService
  ) 
  {

    super(formConfig.patientDetailsForm);
    
   }
   
 allergiesColumnsToDisplay : string[] = ['allergy_id','allergy_type','allergy_name','allergy_desc','info'];
                                     
 
 allergyDataSource : MatTableDataSource<any>;  
  
  patientData: PatientDetails;
  patientAllergyData: PatientAllergy[];
  allergyData: AllergyDetails;
  patientAllergyList:number[]=[];
  allergyMaps: PatientAllergy[] = [];
  allergydatasource: AllergyDetails[] = [];
  allergydatatemporary: AllergyDetails[] = [];
  deleteallegydata: any[] = [];
  userData:User;
  disabled: boolean = true; 
  patientId : number; 
  ngOnInit(): void {
    this.patientId = this.route.snapshot.params["userId"];
    const userId = {
      userId: this.patientId 
    }
    this.apiCommonService.getuserDetails(userId).subscribe(
      res => {
        console.log(res['result']);    
        if (res && res['result'] && res['status'] !=null) {

        const d = new Date(res['result'].dob);          
        const dob =d.getDate()-1 + " - " + d.getMonth()+1 + " - " + d.getFullYear() ;
        console.log(dob);
        

        this.setControlValue('firstname', res['result'].firstName);
        this.setControlValue('lastname', res['result'].lastName);
        this.setControlValue('emailid', res['result'].emailId);
        this.setControlValue('contactnumber', res['result'].contactNo);
        this.setControlValue('dob', dob);
        }
      }
    );
    this.apiCommonService.getpatientDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          
          this.patientData = res['result'];
         

        this.setControlValue('gender', res['result'].gender);
        this.setControlValue('ethnicity', res['result'].ethnicity);
        this.setControlValue('race', res['result'].race); 
        this.setControlValue('languages', res['result'].languagesKnown);
        this.setControlValue('homeaddress', res['result'].homeAddress); 
        this.setControlValue('emergencycontactfirstname', res['result'].emergencyContactEntity.firstName);
        this.setControlValue('emergencycontactlastname', res['result'].emergencyContactEntity.lastName);
        this.setControlValue('emergencycontactrelation', res['result'].emergencyContactEntity.patientRelationship); 
        this.setControlValue('emergencycontactemailid', res['result'].emergencyContactEntity.email);
        this.setControlValue('emergencyhomeaddress', res['result'].emergencyContactEntity.homeAddress); 
        this.setControlValue('emergencycontactnumber', res['result'].emergencyContactEntity.contactNumber);  

          this.patientAllergyData = this.patientData.patientAllergy;
          for (let patientAllergy of this.patientAllergyData) {
            this.patientAllergyList.push(patientAllergy.allergyId);     
          }
          const patientAllergyIdList = {
             allergyId: this.patientAllergyList
          }
            this.apiCommonService.getAllergyListDetails(patientAllergyIdList).subscribe(
              res => {
                if (res && res['result'] && res['status'] === 200) {

                   this.allergyDataSource = res['result'];
                           
                  if (this.allergyData != null) {
                    this.allergydatatemporary.push(this.allergyData);
                  }
                  this.allergydatasource = [...this.allergydatatemporary];
                 
                }
              }
            );
        }
      }
    );
  }

}

