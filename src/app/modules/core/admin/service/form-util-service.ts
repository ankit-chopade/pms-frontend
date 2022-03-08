import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class FormUtilsService {
    [x: string]: any;
    fb = new FormBuilder();

    registrationForm = this.fb.group({
        title:["",Validators.required],
        firstname:["",Validators.required],
        lastname: ["", Validators.required],
        dob: ["", Validators.required],
        emailid :   ["", Validators.email],
        contactnumber :   ["", [Validators.required,Validators.pattern("\\d{10}")]],
        role: ["", Validators.required],
        employeeId: ["", Validators.required],
    });

    patientProcedureModalDialog = this.fb.group({
        code: ['', Validators.required],
        description: [],
        isDepricated: [],
        appointmentId: [],
        selectedId: [],
      
      });
    
      diagnosisDetailsForm = this.fb.group({});
    
      diagnosisModalDialog = this.fb.group({
        code: ['', Validators.required],
        description: ['',Validators.required],
        isDepricated: ['',Validators.required],
        selectedId: [],
        diagnosis:[]
      });
    
      procedureDetailsForm = this.fb.group({
        code: ['', Validators.required],
        description: ['', Validators.required],
        isDepricated: ['', Validators.required],
        
        selectedId: [],
      });
    
      vitalSignsForm = this.fb.group({
        height: ['', [Validators.required, Validators.max(250), Validators.min(0)]],
        weight: [''],
        bloodPressure: [],
        bodyTemperature: [],
        respirationRate: [],
        appointmentId: [],
      });
    
     
    
      medicationDetailsForm = this.fb.group({
        drgId: ['', Validators.required],
        drgName:  ['', Validators.required],
        drgGenericName:  ['', Validators.required],
        drgBrandName: ['', Validators.required],
        drgForm: ['', Validators.required],
        drgStrength:  ['', Validators.required],
        
        selectedId: [],
        
      });
      allergyDetailsForm = this.fb.group({
        allergy_details: ['', ],
        allergyCode: ['', Validators.required],
        allergyType: ['', Validators.required],
        allergyName: ['', Validators.required],
        allergyDescription: ['', Validators.required],
        allergyClinicalInfo: ['', Validators.required],
        allergyId: [],
        selectedId: [],
      });

}