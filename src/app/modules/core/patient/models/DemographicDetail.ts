import { AllergyDetails } from "./AllergyDetails";
import {  PatientAllergy } from "./PatientAllergy";

import { EmergencyDetails } from "./EmergencyDetails";

export class PatientDetails
{
    
    demographicDetailId:number
    gender:String;
    age:String;
    race:String;
    ethnicity:String;
    languagesKnown:String;
    homeAddress:String;
    hasAllergy:string;
     patientAllergy:PatientAllergy[];
     emergencyContactEntity:EmergencyDetails;
}