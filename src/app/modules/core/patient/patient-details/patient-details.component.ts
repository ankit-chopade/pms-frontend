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
import { FormUtilService } from '../service/form-util.service';
import { AllergyDetailsDialogComponent } from './allergy-details-dialog/allergy-details-dialog.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent extends FormBaseController<any> implements OnInit {
  userData:User;
  patientData:PatientDetails;
  AllergyMapData:AllergyMap[];
  allergyData:AllergyDetails;
  allergycode:string;
  errormessage = formErrorMessages;
  allergy_details: string = "false";
  constructor(private dialog: MatDialog, private formConfig: FormUtilService, private apiCommonService: ApiService, private router: Router, private notifyService: NotificationService) {
    super(formConfig.patientDetailsForm);
  }

  allergycolumns: string[] = ['allergyid', 'allergytype', 'allergyname', 'allergydesc', 'allergyclinicalinfo'];
  addrsameaspatient:string;

  allergydatasource: AllergyDetails[] = [];
  allergydatatemporary: AllergyDetails[] = [];
  // allergy_details_dto: AllergyDetails[] = [];

  submitPatientDetailsForm() {
    const emergencyDetails: EmergencyDetails = new EmergencyDetails();
    emergencyDetails.emergencyContactFristName = this.getControlValue('emergencycontactfirstname');
    emergencyDetails.emergencyContactLastName = this.getControlValue('emergencycontactlastname');
    emergencyDetails.patientRelationship = this.getControlValue('emergencycontactrelation');
    emergencyDetails.emergencyContactEmail = this.getControlValue('emergencycontactemailid');
    emergencyDetails.emergencyContact = this.getControlValue('emergencycontactnumber');
    emergencyDetails.homeAddress = this.getControlValue('emergencycontacthomeaddress');

//     const allergyMap: AllergyMap= new AllergyMap();
//     const allergyDetailsEntity:AllergyDetails=new AllergyDetails();
  
//     for(let allergydata of this.allergydatasource)
//     {
//        this.allergycode= allergydata.allergyCode

//     }
//  const allergycode={
//       'allergyCode':Number(this.allergycode)
//     }
//     this.apiCommonService.getAllergyDetailsbyCodeDetails(allergycode).subscribe(
//       res => {
//         if (res && res['result'] && res['status'] === 200) {
//         //  alert("Success");
//               this.allergy_details= res['result']
//               console.log(this.allergy_details);
//              //  this.allergyData.allergyId=this.allergy_details.
//         }
//         else {
//         //  alert("Failed");
//         }
      // }
      // );
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
     // allergyDetailsEntity: this.allergydatasource,
      allergyMap:this.AllergyMapData
     
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
    console.log(this.allergydatasource)
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
        //  alert("Success");
         
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
        //  alert("Failed");
        }
      }
    );
    this.apiCommonService.getpatientDetails(userId).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
   // alert("Success");
         
          this.patientData=res['result'];
          console.log(this.patientData);
          this.setControlValue('age',this.patientData.patientAge)
          this.setControlValue('gender',this.patientData.patientGender)
          this.setControlValue('race',this.patientData.patientRace)
          this.setControlValue('ethnicity',this.patientData.patientEthnicity)
          this.setControlValue('languages',this.patientData.languagesKnown)
          this.setControlValue('homeaddress',this.patientData.homeAddress)
          this.setControlValue('emergencycontactfirstname',this.patientData.emergencyContactEntity.emergencyContactFristName)
          this.setControlValue('emergencycontactlastname',this.patientData.emergencyContactEntity.emergencyContactLastName)
          this.setControlValue('emergencycontactrelation',this.patientData.emergencyContactEntity.patientRelationship)
          this.setControlValue('emergencycontactemailid',this.patientData.emergencyContactEntity.emergencyContactEmail)
          this.setControlValue('emergencycontactnumber',this.patientData.emergencyContactEntity.emergencyContact)
          this.setControlValue('emergencycontacthomeaddress',this.patientData.emergencyContactEntity.homeAddress)
          this.setControlValue('accesstopatientportal',this.patientData.emergencyContactEntity.accessPatientPortal)
          this.setControlValue('allergy_details',this.patientData.patientKnowAllergy);
          
          this.AllergyMapData =this.patientData.allergyMap;
     //     this.AllergyMapData.forEach(this.apiCommonService.getAllergyDetailsById(AllergyMapData))
         for(let AllergyMap of this.AllergyMapData)
         {
                  console.log(AllergyMap.allergyId);
                  const allergyId={
                    'allergyId':Number(AllergyMap.allergyId)
                  }
                  this.apiCommonService.getAllergyDetailsById(allergyId).subscribe(
                    res => {
                      if (res && res['result'] && res['status'] === 200) {
                      //  alert("Success");
                        this.allergyData=res['result'];
                        console.log(this.allergyData);
                        
                       if(this.allergyData!=null)
                       {
                        this.allergydatatemporary.push(this.allergyData);
                   
                        this.setControlValue('allergyid',this.allergyData.allergyCode);
                        this.setControlValue('allergytype',this.allergyData.allergyType);

                        
                       }
                      this.allergydatasource =[...this.allergydatatemporary]
                    //  this.loadGrid();
                       console.log(this.allergydatasource);
                       
                     
                      }
                      else {
                        alert("Failed");
                      }
                    }
                  );
               
                  
         }

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