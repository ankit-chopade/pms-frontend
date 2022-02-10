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

  patientDetails(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT_DETAILS}`, param);
  }

  getAllergyDetailsById(){
    return this.httpClient.get(`${this.baseUrl}${APIConst.ALLERGY_DETAILS_BY_ID}`);
  }

  getAllergyDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS}`);
  }
  
  // Vital signs api

  getVitalSigns(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.VITAL_SIGN_DOMAIN}`, {params:param});
  }

  saveVitalDetails(param: any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.VITAL_SIGN_DOMAIN}`, param);
  }
  /**
   * @param  {} {returnthis.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROCEDURE_DETAILS}`
   */
  getProcDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROCEDURE_DETAILS}`);
  }
  /**
   * @param  {any} param
   */
  getProcDetailsForPatient(param: any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROCEDURE_DOMAIN}`, {params:param});
  }
  /**
   * @param  {any} param
   */
  saveProcDetailsForPatient(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROCEDURE_DOMAIN}`,param);
  }
  /**
   * @param  {any} param
   * @description used to obtain procedure description for procedure code
   */
  getProcDetailsForProcCode(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROC_DETAILS_FOR_PROC_CODE}`, {params:param});
  }
  /**
   * @param  {any} param
   * @description used to obtain procedure code for procedure description
   */
  getProcCodeForProcDesc(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PROC_DETAILS_FOR_PROC_DESC}`, {params:param});
  }

  // Diagnosis apis
  
  saveDiagnosisDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT.DIAGNOSIS_DETAILS}`, param);
  }

  getDiagnosisDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DIAGNOSIS_DOMAIN}`)
  }

  getDiagnosisDetailsForPatient(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT.DIAGNOSIS_DETAILS}`, {params:param});
  }

  // getDiagnosisDetailsForCode(param:any){
  //   return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DIAGNOSIS_DOMAIN}${APIConst.GET_DETAILS_BY_CODE}`, {params:param});
  // }

  // getDiagnosisDetailsForDescription(param:any){
  //   return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DIAGNOSIS_DOMAIN}${APIConst.GET_DETAILS_BY_DESCRIPTION}`, {params:param});
  // }

  //Medication apis

  saveMedicationDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}`, param);
  }
  
  getMedicationDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}`)
  }
  
  getMedicationDetailsForPatient(param:any) { 
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}${APIConst.GET_DETAILS_BY_PATIENT_ID}`,{params:param});
  }

  getDrugDetailsForDrugId(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}${APIConst.GET_DETAILS_BY_CODE}`,{params:param});
  }

  getDrugDetailsForDrugName(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.MEDICATION_DOMAIN}${APIConst.GET_DETAILS_BY_DESCRIPTION}`, {params:param});
  }

  //Patient details screen

  getPatientDetailsForPatientId(param: any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT_DETAIL_DOMAIN}`, {params:param});
  }

}
