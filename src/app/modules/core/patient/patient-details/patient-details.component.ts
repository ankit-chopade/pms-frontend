import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { formErrorMessages } from 'src/app/modules/default/constant/message.constant';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { AllergyDetails } from '../models/AllergyDetails';
import { EmergencyDetails } from '../models/EmergencyDetails';
import { PatientDetails } from '../models/PatientDetails';
import { User } from '../models/User';
import { ApiService } from '../service/api.service';
import { FormUtilServie } from '../service/form-util.service';
import { AllergyDetailsDialogComponent } from './allergy-details-dialog/allergy-details-dialog.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent extends FormBaseController<any> implements OnInit {
  userData:User;
  patientData:PatientDetails;
  errormessage = formErrorMessages;
  allergy_details: string = "false";
  constructor(private dialog: MatDialog, private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router, private notifyService: NotificationService) {
    super(formConfig.patientDetailsForm);
  }

  allergycolumns: string[] = ['allergyid', 'allergytype', 'allergyname', 'allergydesc', 'allergyclinicalinfo'];
  addrsameaspatient:string;

  allergydatasource: AllergyDetails[] = [];
  // allergy_details_dto: AllergyDetails[] = [];

  submitPatientDetailsForm() {
    const emergencyDetails: EmergencyDetails = new EmergencyDetails();
    emergencyDetails.firstname = this.getControlValue('emergencycontactfirstname');
    emergencyDetails.lastname = this.getControlValue('emergencycontactlastname');
    emergencyDetails.relation = this.getControlValue('emergencycontactrelation');
    emergencyDetails.emailid = this.getControlValue('emergencycontactemailid');
    emergencyDetails.number = this.getControlValue('emergencycontactnumber');
    emergencyDetails.homeaddress = this.getControlValue('emergencycontacthomeaddress');


    const param = {
      title: this.getControlValue('title'),
      firstname: this.getControlValue('firstname'),
      lastname: this.getControlValue('lastname'),
      dob: this.getControlValue('dob'),
      age: this.getControlValue('age'),
      gender: this.getControlValue('gender'),
      race: this.getControlValue('race'),
      ethnicity: this.getControlValue('ethnicity'),
      languages: this.getControlValue('languages'),
      emailid: this.getControlValue('emailid'),
      homeaddress: this.getControlValue('homeaddress'),
      contactnumber: this.getControlValue('contactnumber'),
      EmergencyContactEntity: emergencyDetails,
      allergyDetailsEntity: this.allergydatasource,
    }

    this.apiCommonService.patientDetails(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          alert("Success");
        }
        else {
          alert("Failed");
        }
      }
    );

  }
  addAllergies() {
    const dialogRef = this.dialog.open(
      AllergyDetailsDialogComponent, {
      width: '300px',
      disableClose: true,
      data: this.allergydatasource,

    }
    );
    dialogRef.afterClosed().subscribe(
      resp => {
        if(resp!=null){
        this.allergydatasource.push(resp);
        this.loadGrid();
      }
      }
    );
  }

  loadGrid() {
    this.allergydatasource = [...this.allergydatasource];
  }

  // addAllergies1()
  // {
  //   let allergyDetails:AllergyDetails=new AllergyDetails();
  //   allergyDetails.allergy_details= this.getControlValue('allergy_details'),
  //   allergyDetails.allergyid= this.getControlValue('allergyid'),
  //   allergyDetails.allergytype= this.getControlValue('allergytype'),
  //   allergyDetails.allergyname= this.getControlValue('allergyname'),
  //   allergyDetails.allergydesc= this.getControlValue('allergydesc'),
  //   allergyDetails.allergyclinicalinfo= this.getControlValue('allergyclinicalinfo')
  //   this.allergydatasource.push(allergyDetails);
  // }

  ngOnInit(): void { 
    const userId={
      'id':Number(sessionStorage.getItem('userId'))
    }
    this.apiCommonService.getuserDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          alert("Success");
         
          this.userData=res['result'];
          console.log(this.userData);
          this.setControlValue('title',this.userData.title)
          this.setControlValue('firstname',this.userData.firstName)
          this.setControlValue('lastname',this.userData.lastName)
          this.setControlValue('emailid',this.userData.emailId)
          this.setControlValue('contactnumber',this.userData.contactNo)
          this.setControlValue('dob',this.userData.dob)
          
        }
        else {
          alert("Failed");
        }
      }
    );
    this.apiCommonService.getpatientDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          alert("Success");
         
          this.patientData=res['result'];
          console.log(this.userData);
          this.setControlValue('age',this.patientData.patientAge)
          this.setControlValue('gender',this.patientData.patientGender)
          this.setControlValue('race',this.patientData.patientRace)
          this.setControlValue('ethnicity',this.patientData.patientEthnicity)
          this.setControlValue('languages',this.patientData.LanguagesKnown)
          this.setControlValue('homeaddress',this.patientData.homeAddress)
          this.setControlValue('emergencycontactfirstname',this.patientData.EmergencyContactEntity.firstname)
          this.setControlValue('emergencycontactlastname',this.patientData.EmergencyContactEntity.lastname)
          this.setControlValue('emergencycontactrelation',this.patientData.EmergencyContactEntity.relation)
          this.setControlValue('emergencycontactemailid',this.patientData.EmergencyContactEntity.emailid)
          this.setControlValue('emergencycontactnumber',this.patientData.EmergencyContactEntity.number)
          this.setControlValue('emergencycontacthomeaddress',this.patientData.EmergencyContactEntity.homeaddress)
     
        }
        else {
          alert("Failed");
        }
      }
    );
  }

  sameAddres(){
    if(this.addrsameaspatient){
      this.setControlValue("emergencycontacthomeaddress",this.getControlValue("homeaddress"))
    }
  }
}
