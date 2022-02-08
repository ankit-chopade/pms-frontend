import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class FormUtilService {

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
        addrsameaspatient: ["", Validators.required],
        emergencycontacthomeaddress: [""],
        allergy_details:["",Validators.required],
        allergyid:["",Validators.required],
        allergytype:["",Validators.required],
        allergyname:["",Validators.required],
        allergydesc:["",Validators.required],
        allergyclinicalinfo:["",Validators.required],
    });

    allergyDetailsForm=this.fb.group({
        allergy_details:["",Validators.required],
        allergyid:["",Validators.required],
        allergytype:["",Validators.required],
        allergyname:["",Validators.required],
        allergydesc:["",Validators.required],
        allergyclinicalinfo:["",Validators.required],
    });

    patientVisitForm = this.fb.group({
        // height:["22"],
        // weight:[""],
        // bloodPressure:[],
        // bodyTemperature:[],
        // respirationRate:[],
        // diagnosisCode:[],
        // diagnosisDesc:[],
        // diagnosisIsDepricated:[],
        // procedureCode:[],
        // procedureDesc:[],
        // procedureIsDepricated:[],
        // drugId:[],
        // drugName:[],
        // drugGenericName:[],
        // drugBrandName:[],
        // drugForm:[],
    
      });
    
      patientDetails = this.fb.group({
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
            addrsameaspatient: ["", Validators.required],
            emergencycontacthomeaddress: [""],
            allergy_details:["",Validators.required],
            allergyid:["",Validators.required],
            allergytype:["",Validators.required],
            allergyname:["",Validators.required],
            allergydesc:["",Validators.required],
            allergyclinicalinfo:["",Validators.required],
      });
    
      patientProcedureModalDialog = this.fb.group({
        code:[],
        description:[],
        isDepricated:[],
        appointmentId: [],
        selectedId: [],
      });
    
      diagnosisDetailsForm = this.fb.group({
    
      });
    
      diagnosisModalDialog = this.fb.group({
        code:[],
        description:[],
        isDepricated:[],
        appointmentId: [],
        selectedId: [],
      });
    
      procedureDetailsForm = this.fb.group({
    
      });
    
      vitalSignsForm = this.fb.group({
        height:[],
        weight:[],
        bloodPressure:[],
        bodyTemperature:[],
        respirationRate:[],
        appointmentId: [],
      });
    
      medicationDetailsForm = this.fb.group({
    
      });
    
      medicationModalDialog = this.fb.group({
        drgId:[],
        drgName:[],
        drgGenericName:[],
        drgBrandName:[],
        drgForm:[],
        drgStrength:[],
        appointmentId:[],
        selectedId:[],
      });


}