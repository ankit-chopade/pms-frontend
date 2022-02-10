import { AllergyDetails } from "./AllergyDetails";
import { EmergencyDetails } from "./EmergencyDetails";

export class PatientDetails
{
    
   
    patientGender:String;
    patientAge:String;
    patientRace:String;
    patientEthnicity:String;
    LanguagesKnown:String;
    homeAddress:String;
	allergyDetails:AllergyDetails[];
    EmergencyContactEntity:EmergencyDetails;
}