import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAPIWrapper } from '../../../common/interfaces/api-wrapper.interface';
import { APIConst } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 //private baseUrl = environment.baseUrl;
  private baseUrl = environment.managementUrl
  private diagnosisUrl = environment.diagnosisUrl;
  private allergyUrl = environment.allergyUrl;
  private medicationUrl = environment.medicationUrl;
  private procedureUrl = environment.procedureUrl;
  private visitUrl = environment.visitUrl;


  constructor(private httpClient: HttpClient) {
  }
  patients() {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_PATIENTS}`);
  }

  patientDetails(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT_DETAILS}`, param);
  }

  // getAllergyDetailsById(param:any){
  //   return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS_BY_ID}`,{params:param});
  // }
  
  getAllergyListDetails(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_ALLERGY_LIST}`,{params:param});
  }

  getAllergyDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS}`);
  }
 
  getuserDetails(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_USER_DATA}`,{params:param});
  }
  getpatientDetails(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_PATIENT_DATA}`,{params:param});
  }

  saveAllergyDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS}`,param);
  }

  getAllergyDetailsbyCodeDetails(param:any){
 
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_ALLERGY_DETAILS}`,{params:param});
  }

  // Vital signs api
  getVitalSigns(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.VITAL_SIGN_DOMAIN}`, {params:param});
  }

  saveVitalDetails(param: any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.VITAL_SIGN_DOMAIN}`, param);
  }
  updateVitalDetails(param: any){
    return this.httpClient.put<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.VITAL_SIGN_DOMAIN}`, param);
  }
  
  // procedure apis
  getProcDetailsForPatient(param: any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.PROCEDURE_DETAILS}`, {params:param});
  }

  saveProcDetailsForPatient(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.PROCEDURE_DETAILS}`,param);
  }

  deleteProcedureDetail(param: any){
    return this.httpClient.delete<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.PROCEDURE_DETAILS}`, {params:param});
  }

  // Diagnosis apis
  saveDiagnosisDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.DIAGNOSIS_DETAILS}`, param);
  }

  getDiagnosisDetailsForPatient(param:any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.DIAGNOSIS_DETAILS}`, {params:param});
  }

  deleteDiagnosisDetail(param:any){
    return this.httpClient.delete<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.DIAGNOSIS_DETAILS}`, {params:param});
  }

  //Medication apis
  saveMedicationDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.MEDICATION_DETAILS}`, param);
  }
  
  getMedicationDetailsForPatient(param:any) { 
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.MEDICATION_DETAILS}`,{params:param});
  }

  deleteMedicationDetail(param:any){
    return this.httpClient.delete<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.MEDICATION_DETAILS}`, {params:param})
  }

  //Patient details screen
  getPatientDetailsForPatientId(param: any){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT_DETAIL_DOMAIN}`, {params:param});
  }

  // master Procedure data
  getProcDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.procedureUrl}${APIConst.PROCEDURE_DOMAIN}${APIConst.NON_DEPRICATED}`);
  }

  // master diagnosis data
  getNonDepricatedDiagnosisDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.diagnosisUrl}${APIConst.DIAGNOSIS_DOMAIN}${APIConst.NON_DEPRICATED}`);
  }

  // dashboard details
  getBloodPressureList(param:any) {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.BLOOD_PRESSURE_LIST}`,{params:param});
  }

  getRespirationList(param:any) {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.RESPIRATION_LIST}`,{params:param});
  }

  getLatestVitalSigns(param:any) {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.DASHBOARD_VITAL_SIGN}`, {params:param});
  }

  // master medication data
  getMedicationDetails(){
    return this.httpClient.get<IAPIWrapper<any>>(`${this.medicationUrl}${APIConst.MEDICATION_DOMAIN}`)
  }

  //visit-history
   getAllVisitsDetails(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.visitUrl}${APIConst.VISIT_DOMAIN}${APIConst.PATIENT.VISIT_HISTORY}`, param);
  }

}
