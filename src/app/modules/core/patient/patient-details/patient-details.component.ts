import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { formErrorMessages } from 'src/app/modules/default/constant/message.constant';

import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { AllergyDetails } from '../models/AllergyDetails';




import { EmergencyDetails } from '../models/EmergencyDetails';
import { PatientDetails } from '../models/DemographicDetail';
import { User } from '../models/User';
import { ApiService } from '../service/api.service';
import { FormUtilService } from '../service/form-util.service';
import { AllergyDetailsDialogComponent } from './allergy-details-dialog/allergy-details-dialog.component';
import { PatientAllergy } from '../models/PatientAllergy';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
  providers: [DatePipe]
})
export class PatientDetailsComponent extends FormBaseController<any> implements OnInit {
  [x: string]: any;

  userData: User;
  patientData: PatientDetails;
  AllergyMapData: PatientAllergy[];
  allergyData: AllergyDetails;
  // allergyIds: number[] = [];
  allergyMaps: PatientAllergy[] = [];
  patientdob: any;
  errormessage = formErrorMessages;
  allergy_details: string = "false";
  latest_date: any;
  todayDate: Date;
  age: number;
 
  constructor(private dialog: MatDialog, private formConfig: FormUtilService, private apiCommonService: ApiService, private router: Router, private notifyService: NotificationService, private datePipe: DatePipe) {
    super(formConfig.patientDetailsForm);
  }

  allergycolumns: string[] = ['allergyid', 'allergytype', 'allergyname', 'allergydesc', 'allergyclinicalinfo', 'delete'];
  addrsameaspatient: string;

  allergydatasource: AllergyDetails[] = [];
  allergydatatemporary: AllergyDetails[] = [];
  deleteallegydata: any[] = [];
  otherType: AllergyDetails = new AllergyDetails();

  // allergy_details_dto: AllergyDetails[] = [];

  submitPatientDetailsForm() {
    const emergencyDetails: EmergencyDetails = new EmergencyDetails();
    emergencyDetails.firstName = this.getControlValue('emergencycontactfirstname');
    emergencyDetails.lastName = this.getControlValue('emergencycontactlastname');
    emergencyDetails.patientRelationship = this.getControlValue('emergencycontactrelation');
    emergencyDetails.email = this.getControlValue('emergencycontactemailid');
    emergencyDetails.contactNumber = this.getControlValue('emergencycontactnumber');
    emergencyDetails.homeAddress = this.getControlValue('emergencycontacthomeaddress');
    emergencyDetails.accessPatientPortal = this.getControlValue('accesstopatientportal');

    this.checkPriviousAllergy();

    const demographicDetail = {
      age: this.getControlValue('age'),
      gender: this.getControlValue('gender'),
      race: this.getControlValue('race'),
      ethnicity: this.getControlValue('ethnicity'),
      languagesKnown: this.getControlValue('languages'),
     // emailid: this.getControlValue('emailid'),
      contactNumber: this.getControlValue('contactnumber'),
      homeAddress: this.getControlValue('homeaddress'),
      userId: Number(sessionStorage.getItem('userId')),
      active: 1,
      has_Allergy: this.getControlValue('allergy_details'),
      emergencyContactEntity: emergencyDetails,
      patientAllergy: this.allergyMaps


    }
    console.log(demographicDetail);
    this.apiCommonService.patientDetails(demographicDetail).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.clear();
          // alert("Success");
          this.notifyService.showSuccess("Added data Successfully", "Success")
        }
        else {
          //  alert("Failed");
          this.notifyService.showError("Data not Saved", "Failed")
        }
      }
    );
  }
  addAllergies() {
    const dialogRef = this.dialog.open(AllergyDetailsDialogComponent, {
      width: '300px',
      disableClose: true,
      data: this.allergydatasource,

    }
    );
    dialogRef.afterClosed().subscribe(
      resp => {
        if (resp != null) {
          this.getAllAllergyId(resp);
          //  // // console.log(resp);

          //  this.allergydatasource.push(resp);
          this.loadGrid();
        }
      }
    );
  }

  loadGrid() {
    // console.log(this.allergydatasource)
    this.allergydatasource = [...this.allergydatasource];
  }
  ngOnInit(): void {
    const userId = {
      userId: Number(sessionStorage.getItem('userId'))
    }
    this.apiCommonService.getuserDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          //  alert("Success");

          this.userData = res['result'];
          // // console.log(this.userData);
          this.setControlValue('title', this.userData.title)
          this.setControlValue('firstname', this.userData.firstName)
          this.setControlValue('lastname', this.userData.lastName)
          this.setControlValue('emailid', this.userData.emailId)
          this.setControlValue('contactnumber', this.userData.contactNo)
          this.setControlValue('dob', this.userData.dob);
          this.calculateAge();
          this.setControlValue('age', this.age);
        }


      }
    );
    this.apiCommonService.getpatientDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          // alert("Success");

          this.patientData = res['result'];
          //   // // console.log(this.patientData);
          console.log( this.age);
          
         
          this.setControlValue('gender', this.patientData.gender)
          this.setControlValue('race', this.patientData.race)
          this.setControlValue('ethnicity', this.patientData.ethnicity)
          this.setControlValue('languages', this.patientData.languagesKnown)
          this.setControlValue('homeaddress', this.patientData.homeAddress)
          this.setControlValue('emergencycontactfirstname', this.patientData.emergencyContactEntity.firstName)
          this.setControlValue('emergencycontactlastname', this.patientData.emergencyContactEntity.lastName)
          this.setControlValue('emergencycontactrelation', this.patientData.emergencyContactEntity.patientRelationship)
          this.setControlValue('emergencycontactemailid', this.patientData.emergencyContactEntity.email)
          this.setControlValue('emergencycontactnumber', this.patientData.emergencyContactEntity.contactNumber)
          this.setControlValue('emergencycontacthomeaddress', this.patientData.emergencyContactEntity.homeAddress)
          this.setControlValue('accesstopatientportal', this.patientData.emergencyContactEntity.accessPatientPortal)
          this.setControlValue('allergy_details', this.patientData.has_Allergy);
         console.log(this.patientData.has_Allergy);

          this.AllergyMapData = this.patientData.patientAllergy;
          for (let AllergyMap of this.AllergyMapData) {
            //   // // console.log(AllergyMap.allergyId);
            const allergyId = {
              'allergyId': Number(AllergyMap.allergyId)
            }
            this.apiCommonService.getAllergyDetailsById(allergyId).subscribe(
              res => {
                if (res && res['result'] && res['status'] === 200) {

                  //  alert("Success");
                  this.allergyData = res['result'];
                  // // console.log(this.allergyData);

                  if (this.allergyData != null) {
                    this.allergydatatemporary.push(this.allergyData);
                  }
                  this.allergydatasource = [...this.allergydatatemporary];
                  // // console.log(this.allergydatasource);
                }
              }
            );
          }
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

    let obj: PatientAllergy = new PatientAllergy();
    obj.allergyId = +data['allergyId'];

    if (obj.allergyId == 0) {

      // console.log("enter in get allergy")
      this.otherType.allergyCode = data['allergyCode']
      this.otherType.allergyType = data['allergyType']
      this.otherType.allergyName = data['allergyName']
      this.otherType.allergyClinicalInfo = data['allergyClinicalInfo']
      this.otherType.allergyDescription = data['allergyDescription']
      // console.log(this.otherType);
      this.saveOtherAllergy(this.otherType)

    }
    else {
      if (this.validateExistingAllergy(obj.allergyId)) {
        this.allergydatasource.push(data);

        this.allergyMaps.push(obj);
      }
      else {
        this.notifyService.showError("This Allergy is alerady present", "");
      }

    }
  }
  saveOtherAllergy(data: any) {
    this.allergydatasource.push(data);
    const allergyDetailsEntity: AllergyDetails = new AllergyDetails();
    allergyDetailsEntity.allergyCode = this.otherType.allergyCode,
      allergyDetailsEntity.allergyName = this.otherType.allergyName,
      allergyDetailsEntity.allergyType = this.otherType.allergyType,
      allergyDetailsEntity.allergyDescription = this.otherType.allergyDescription,
      allergyDetailsEntity.allergyClinicalInfo = this.otherType.allergyClinicalInfo,
      this.apiCommonService.saveAllergyDetails(allergyDetailsEntity).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            //  alert("Success");
            this.allergyData = res['result'];

            let obj: PatientAllergy = new PatientAllergy();
            obj.allergyId = this.allergyData.allergyId

            this.allergyMaps.push(obj);
            //// console.log(obj);
          }
          else {
            //  alert("Failed");
          }
        }
      );
  }
  checkPriviousAllergy() {

    for (let Allergy of this.allergydatatemporary) {
      let obj: PatientAllergy = new PatientAllergy();

      obj.allergyId = Allergy.allergyId
      this.allergyMaps.push(obj);
      console.log(obj);

    }
  }
  validateExistingAllergy(allergyId: any): boolean {
    let data = this.allergydatasource.find(a => a.allergyId === allergyId);
    if (data == null) {
      return true;
    }
    else {
      return false;
    }
  }

  delete(id: number) {

    this.allergydatasource.forEach((element, index) => {
      if (element.allergyId == id) this.allergydatasource.splice(index, 1)
    });

    this.allergydatatemporary.forEach((element, index) => {
      if (element.allergyId == id) this.allergydatatemporary.splice(index, 1)
    });

    this.allergyMaps.forEach((element, index) => {
      if (element.allergyId == id) this.allergyMaps.splice(index, 1)
    });

    this.loadGrid();

  }
  clear() {
    this.setControlValue('title', "")
    this.setControlValue('firstname', "")
    this.setControlValue('lastname', "")
    this.setControlValue('emailid', "")
    this.setControlValue('contactnumber', "")
    this.setControlValue('dob', "")
    this.setControlValue('age', "")
    this.setControlValue('gender', "")
    this.setControlValue('race', "")
    this.setControlValue('ethnicity', "")
    this.setControlValue('languages', "")
    this.setControlValue('homeaddress', "")
    this.setControlValue('emergencycontactfirstname', "")
    this.setControlValue('emergencycontactlastname', "")
    this.setControlValue('emergencycontactrelation', "")
    this.setControlValue('emergencycontactemailid', "")
    this.setControlValue('emergencycontactnumber', "")
    this.setControlValue('emergencycontacthomeaddress', "")
    this.setControlValue('accesstopatientportal', "")
    this.setControlValue('allergy_details', "");
  }

public  calculateAge() {
  this.patientdob = this.datePipe.transform(this.userData.dob, 'yyyy-MM-dd');
    let patientdob = this.patientdob.substring(0, 10).split('-')
    this.patientdob = patientdob[0];
    
    this.todayDate = new Date();
    this.latest_date = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    this.latest_date = this.latest_date.substring(0, 10).split('-')
    this.latest_date = this.latest_date[0]
    
    let timeDiff = Math.abs(this.latest_date - this.patientdob);
    this.age=timeDiff;
   console.log( this.age);
    let patientage = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    

}
}