import { AllergyDetails } from "./AllergyDetails";
import { AllergyMap } from "./AllergyMap";

import { EmergencyDetails } from "./EmergencyDetails";

export class PatientDetails
{
    
   
    patientGender:String;
    patientAge:String;
    patientRace:String;
    patientEthnicity:String;
    languagesKnown:String;
    homeAddress:String;
    patientKnowAllergy:string;
//	allergyDetails:AllergyDetails[];
     allergyMap:AllergyMap[];
     emergencyContactEntity:EmergencyDetails;
}