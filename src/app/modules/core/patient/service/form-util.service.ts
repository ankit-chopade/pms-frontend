import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilService {
  [x: string]: any;

  fb = new FormBuilder();

  patientVisitForm = this.fb.group({});

  patientDetails = this.fb.group({
    title: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    dob: ['', Validators.required],
    age: ['', Validators.required],
    gender: ['', Validators.required],
    race: ['', Validators.required],
    ethnicity: ['', Validators.required],
    languages: ['', Validators.required],
    emailid: ['', Validators.email],
    homeaddress: ['', Validators.required],
    accesstopatientportal: ['', Validators.required],
    contactnumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
    emergencycontactfirstname: ['', Validators.required],
    emergencycontactlastname: ['', Validators.required],
    emergencycontactrelation: ['', Validators.required],
    emergencycontactemailid: ['', Validators.required],
    emergencycontactnumber: [
      '',
      [Validators.required, Validators.pattern('\\d{10}')],
    ],
    addrsameaspatient: ['', Validators.required],
    emergencycontacthomeaddress: [''],
    allergy_details: ['', Validators.required],
    allergyid: ['', Validators.required],
    allergytype: ['', Validators.required],
    allergyname: ['', Validators.required],
    allergydesc: ['', Validators.required],
    allergyclinicalinfo: ['', Validators.required],
  });

  patientProcedureModalDialog = this.fb.group({
    code: ['', Validators.required],
    description: [],
    isDepricated: [],
    appointmentId: [],
    selectedId: [],
    details: ['', Validators.required],
  });

  diagnosisDetailsForm = this.fb.group({});

  diagnosisModalDialog = this.fb.group({
    code: ['', Validators.required],
    description: [],
    isDepricated: [],
    appointmentId: [],
    selectedId: [],
    details: ['', Validators.required],
  });

  procedureDetailsForm = this.fb.group({});

  vitalSignsForm = this.fb.group({
    height: ['', [Validators.required, Validators.max(250), Validators.min(0)]],
    weight: [''],
    bloodPressure: [],
    bodyTemperature: [],
    respirationRate: [],
    appointmentId: [],
  });

  medicationDetailsForm = this.fb.group({});

  medicationModalDialog = this.fb.group({
    drgId: ['', Validators.required],
    drgName: [],
    drgGenericName: [],
    drgBrandName: [],
    drgForm: ['', Validators.required],
    drgStrength: [],
    appointmentId: [],
    selectedId: [],
    details: ['', Validators.required],
  });

  patientDetailsForm = this.fb.group({
    title: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    dob: ['', Validators.required],
    age: ['', Validators.required],
    gender: ['', Validators.required],
    race: ['', Validators.required],
    ethnicity: ['', Validators.required],
    languages: ['', Validators.required],
    emailid: ['', Validators.email],
    homeaddress: ['', Validators.required],
    accesstopatientportal: ['', Validators.required],
    contactnumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
    emergencycontactfirstname: ['', Validators.required],
    emergencycontactlastname: ['', Validators.required],
    emergencycontactrelation: ['', Validators.required],
    emergencycontactemailid: ['', Validators.required],
    emergencycontactnumber: [
      '',
      [Validators.required, Validators.pattern('\\d{10}')],
    ],
    addrsameaspatient: [],
    emergencycontacthomeaddress: [''],
    allergy_details: [],
    allergyid: [],
    allergytype: [],
    allergyname: [],
    allergydesc: [],
    allergyclinicalinfo: [],
  });

  allergyDetailsForm = this.fb.group({
    allergy_details: ['', Validators.required],
    allergyCode: ['', Validators.required],
    allergyType: ['', Validators.required],
    allergyName: ['', Validators.required],
    allergyDescription: ['', Validators.required],
    allergyClinicalInfo: ['', Validators.required],
    allergyId: [],
  });
  employeeRegistrationForm = this.fb.group({
    title: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    dob: ['', Validators.required],
    username: ['', Validators.email],
    contactnumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
    emailid: ['', Validators.email],
  });

  dashboardPatient = this.fb.group({
    height:[],
    weight: [],
    temperature: [],
    pulse: [],
  });
}
