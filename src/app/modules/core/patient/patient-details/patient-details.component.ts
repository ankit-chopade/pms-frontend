import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { formErrorMessages } from 'src/app/modules/default/constant/message.constant';

import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { AllergyDetails } from '../models/AllergyDetails';
import { AllergyMap } from '../models/AllergyMap';



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
  userData: User;
  patientData: PatientDetails;
  AllergyMapData: AllergyMap[];
  allergyData: AllergyDetails;
  allergyIds: number[] = [];
  allergyMaps: any[] = [];

  errormessage = formErrorMessages;
  allergy_details: string = "false";
  constructor(private dialog: MatDialog, private formConfig: FormUtilServie, private apiCommonService: ApiService, private router: Router, private notifyService: NotificationService) {
    super(formConfig.patientDetailsForm);
  }

  allergycolumns: string[] = ['allergyid', 'allergytype', 'allergyname', 'allergydesc', 'allergyclinicalinfo'];
  addrsameaspatient: string;

  allergydatasource: AllergyDetails[] = [];
  allergydatatemporary: AllergyDetails[] = [];
  otherType: AllergyDetails = new AllergyDetails();
  // allergy_details_dto: AllergyDetails[] = [];

  submitPatientDetailsForm() {
    const emergencyDetails: EmergencyDetails = new EmergencyDetails();
    emergencyDetails.emergencyContactFristName = this.getControlValue('emergencycontactfirstname');
    emergencyDetails.emergencyContactLastName = this.getControlValue('emergencycontactlastname');
    emergencyDetails.patientRelationship = this.getControlValue('emergencycontactrelation');
    emergencyDetails.emergencyContactEmail = this.getControlValue('emergencycontactemailid');
    emergencyDetails.emergencyContact = this.getControlValue('emergencycontactnumber');
    emergencyDetails.homeAddress = this.getControlValue('emergencycontacthomeaddress');
    emergencyDetails.accessPatientPortal = this.getControlValue('accesstopatientportal');
    
    this.checkPriviousAllergy();

    const patientEntity = {
     
      patientAge: this.getControlValue('age'),
      patientGender: this.getControlValue('gender'),
      patientRace: this.getControlValue('race'),
      patientEthnicity: this.getControlValue('ethnicity'),
      languagesKnown: this.getControlValue('languages'),
      emailid: this.getControlValue('emailid'),
      homeAddress: this.getControlValue('homeaddress'),
      userId :Number(sessionStorage.getItem('userId')),
      active:1,
      patientKnowAllergy:this.getControlValue('allergy_details'),
      emergencyContactEntity: emergencyDetails,
     
      allergyMap: this.allergyMaps

    }

    this.apiCommonService.patientDetails(patientEntity).subscribe(
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
    const dialogRef = this.dialog.open( AllergyDetailsDialogComponent, {
      width: '300px',
      disableClose: true,
      data: this.allergydatasource,

    }
    );
    dialogRef.afterClosed().subscribe(
      resp => {
        if (resp != null) {
          // console.log(resp);
          this.getAllAllergyId(resp)
        //  this.allergydatasource.push(resp);
          this.loadGrid();
        }
      }
    );
  }

  loadGrid() {
    console.log(this.allergydatasource)
    this.allergydatasource = [...this.allergydatasource];
  }

 

  ngOnInit(): void {
    const userId = {
      'id': Number(sessionStorage.getItem('userId'))
    }
    this.apiCommonService.getuserDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          //  alert("Success");

          this.userData = res['result'];
          console.log(this.userData);
          this.setControlValue('title', this.userData.title)
          this.setControlValue('firstname', this.userData.firstName)
          this.setControlValue('lastname', this.userData.lastName)
          this.setControlValue('emailid', this.userData.emailId)
          this.setControlValue('contactnumber', this.userData.contactNo)
          this.setControlValue('dob', this.userData.dob)

        }
        else {
          //  alert("Failed");
        }
      }
    );
    this.apiCommonService.getpatientDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          // alert("Success");

          this.patientData = res['result'];
          console.log(this.patientData);
          this.setControlValue('age', this.patientData.patientAge)
          this.setControlValue('gender', this.patientData.patientGender)
          this.setControlValue('race', this.patientData.patientRace)
          this.setControlValue('ethnicity', this.patientData.patientEthnicity)
          this.setControlValue('languages', this.patientData.languagesKnown)
          this.setControlValue('homeaddress', this.patientData.homeAddress)
          this.setControlValue('emergencycontactfirstname', this.patientData.emergencyContactEntity.emergencyContactFristName)
          this.setControlValue('emergencycontactlastname', this.patientData.emergencyContactEntity.emergencyContactLastName)
          this.setControlValue('emergencycontactrelation', this.patientData.emergencyContactEntity.patientRelationship)
          this.setControlValue('emergencycontactemailid', this.patientData.emergencyContactEntity.emergencyContactEmail)
          this.setControlValue('emergencycontactnumber', this.patientData.emergencyContactEntity.emergencyContact)
          this.setControlValue('emergencycontacthomeaddress', this.patientData.emergencyContactEntity.homeAddress)
          this.setControlValue('accesstopatientportal', this.patientData.emergencyContactEntity.accessPatientPortal)
          this.setControlValue('allergy_details', this.patientData.patientKnowAllergy);

          this.AllergyMapData = this.patientData.allergyMap;
          //     this.AllergyMapData.forEach(this.apiCommonService.getAllergyDetailsById(AllergyMapData))
          for (let AllergyMap of this.AllergyMapData) {
            console.log(AllergyMap.allergyId);
            const allergyId = {
              'allergyId': Number(AllergyMap.allergyId)
            }
            this.apiCommonService.getAllergyDetailsById(allergyId).subscribe(
              res => {
                if (res && res['result'] && res['status'] === 200) {
                  //  alert("Success");
                  this.allergyData = res['result'];
                  console.log(this.allergyData);

                  if (this.allergyData != null) {
                    this.allergydatatemporary.push(this.allergyData);

                    this.setControlValue('allergyid', this.allergyData.allergyCode);
                    this.setControlValue('allergytype', this.allergyData.allergyType);


                  }
                  this.allergydatasource = [...this.allergydatatemporary]
                  //  this.loadGrid();
                  console.log(this.allergydatasource);


                }
                else {
                  //  alert("Failed");
                }
              }
            );


          }

        }
        else {
          //  alert("Failed");
        }
      }
    );
  }

  sameAddres() {
    if (this.addrsameaspatient) {
      this.setControlValue("emergencycontacthomeaddress", this.getControlValue("homeaddress"))
    }
  }

  getAllAllergyId(data: any) {

    let obj: AllergyMap = new AllergyMap();
    obj.allergyId = +data['allergyId']
   // this.allergyMaps.push(obj);
   
    if(obj.allergyId==0)
    { 

      console.log("enter in get allergy")
      this.otherType.allergyCode=data['allergyCode']
      this.otherType.allergyType=data['allergyType']
      this.otherType.allergyName=data['allergyName']
      this.otherType.allergyClinicalInfo=data['allergyClinicalInfo']
      this.otherType.allergyDescription=data['allergyDescription']
         console.log(this.otherType);
         this.saveOtherAllergy(this.otherType)
         

    //     this.allergydatasource.push(data);
    }
    else{
      this.allergydatasource.push(data);
      // for (let AllergyMap of this.allergydatatemporary) {

      //   obj.allergyId=AllergyMap.allergyId
      // }
      this.allergyMaps.push(obj);
    }
   

  }
  saveOtherAllergy(data :any)
  {
    this.allergydatasource.push(data);
    const allergyDetailsEntity:AllergyDetails=new AllergyDetails();
    allergyDetailsEntity.allergyCode=this.otherType.allergyCode,
    allergyDetailsEntity.allergyName=this.otherType.allergyName,
    allergyDetailsEntity.allergyType=this.otherType.allergyType,
    allergyDetailsEntity.allergyDescription=this.otherType.allergyDescription,
    allergyDetailsEntity.allergyClinicalInfo=this.otherType.allergyClinicalInfo,
    this.apiCommonService.saveAllergyDetails(allergyDetailsEntity).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          //  alert("Success");
          this.allergyData = res['result'];
          console.log(this.allergyData);

          let obj: AllergyMap = new AllergyMap();
          obj.allergyId = this.allergyData.allergyId
          // for (let AllergyMap of this.allergydatatemporary) {

          //   obj.allergyId=AllergyMap.allergyId
          // }
        
          this.allergyMaps.push(obj);
          console.log(obj);
        }
        else {
          //  alert("Failed");
        }
      }
    );

  }
  checkPriviousAllergy(){
    let obj: AllergyMap = new AllergyMap();
    for (let AllergyMap of this.allergydatatemporary) {

      obj.allergyId=AllergyMap.allergyId
      this.allergyMaps.push(obj);
    }
  }
}
