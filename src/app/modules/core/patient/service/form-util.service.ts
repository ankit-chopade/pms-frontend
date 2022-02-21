import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class FormUtilServie {
    [x: string]: any;

    fb = new FormBuilder();

    patientDetailsForm=this.fb.group({
        title:["",Validators.required],
        firstname:["",Validators.required],
        lastname: ["", Validators.required],
        dob: ["", Validators.required],
        age: ["", Validators.required],
        gender: ["", Validators.required],
        race: ["", Validators.required],
        ethnicity: ["", Validators.required],
        languages: ["", Validators.required],
        emailid :   ["", Validators.email],
        homeaddress: ["", Validators.required],
        accesstopatientportal: ["", Validators.required],
        contactnumber :   ["", [Validators.required,Validators.pattern("\\d{10}")]],
        emergencycontactfirstname:["",Validators.required],
        emergencycontactlastname: ["", Validators.required],
        emergencycontactrelation: ["", Validators.required],
        emergencycontactemailid: ["", Validators.required],
        emergencycontactnumber :   ["", [Validators.required,Validators.pattern("\\d{10}")]],
        addrsameaspatient: [],
        emergencycontacthomeaddress: [""],
         allergy_details:[],
         allergyid:[],
         allergytype:[],
         allergyname:[],
         allergydesc:[],
         allergyclinicalinfo:[],
    });

        allergyDetailsForm=this.fb.group({
        allergy_details:["",Validators.required],
        allergyCode:["",Validators.required],
        allergyType:["",Validators.required],
        allergyName:["",Validators.required],
        allergyDescription:["",Validators.required],
        allergyClinicalInfo:["",Validators.required],
        allergyId   :[],
       selectedAllergyId:[]
    });
    employeeRegistrationForm = this.fb.group({
        title:["",Validators.required],
        firstname:["",Validators.required],
        lastname: ["", Validators.required],
        dob: ["", Validators.required],
        username :   ["", Validators.email],
        contactnumber :   ["", [Validators.required,Validators.pattern("\\d{10}")]],
        emailid: ["", Validators.email],
    });

}