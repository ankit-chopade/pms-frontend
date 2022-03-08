import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAPIWrapper } from '../../../common/interfaces/api-wrapper.interface';
import { APIConst } from '../constants/api.constant';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.baseUrl;


  constructor(private httpClient: HttpClient) {
  }

  employeeDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.EMPLOYEE_DETAILS}`);
  }
  patientDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT_DETAILS}`);
  }
  employeeRegistration(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.EMPLOYEE_REGISTRATION}`,param);
  }
  updateStatus(param:any){
    return this.httpClient.put<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.UPDATE_STATUS}`,param);
  }
  getProcDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROCEDURE_DOMAIN}`);
  }
  /**
   * @param  {any} param
   */
 
  /**
   * @param  {any} param
   */
 

  // Diagnosis apis
  
 
  getDiagnosisDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DIAGNOSIS_DOMAIN}`)
  }

  saveDiagnosisDetail(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DIAGNOSIS_DOMAIN}`, param);
  }

  deleteDiagnosisDetail(param:any){
    return this.httpClient.delete(`${this.baseUrl}${APIConst.DIAGNOSIS_DOMAIN}`,{params:param});
  }

  //Medication apis

  saveMedicationDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}`, param);
  }
  
  getMedicationDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}`)
  }
  
  

  deleteMedicationDetail(param:any){
    return this.httpClient.delete(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}`, {params:param})
  }

 //Procedure
 saveProcedureDetail(param:any){
  return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROCEDURE_DOMAIN}`, param);
}
deleteProcedureDetail(param:any){
  return this.httpClient.delete(`${this.baseUrl}${APIConst.PROCEDURE_DOMAIN}`,{params:param});
}
 
getAllergyDetails(){
  return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS}`);
}
saveAllergyDetails(param:any){
 
  return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS}`,param);
}
deletAllergyDetail(param:any){
  return this.httpClient.delete(`${this.baseUrl}${APIConst.ALLERGY_DETAILS}`, {params:param})
}

 

}
