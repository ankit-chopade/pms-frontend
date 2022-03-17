import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAPIWrapper } from '../../../common/interfaces/api-wrapper.interface';
import { APIConst } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private allergyUrl = environment.allergyUrl;
  private diagnosisUrl = environment.diagnosisUrl;
  private medicationUrl = environment.medicationUrl;
  private procedureUrl = environment.procedureUrl;
  private managementUrl = environment.managementUrl;
  constructor(private httpClient: HttpClient) {}

  employeeDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(
      `${this.managementUrl}${APIConst.EMPLOYEE_DETAILS}`
    );
  }
  patientDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(
      `${this.managementUrl}${APIConst.PATIENT_DETAILS}`
    );
  }
  employeeRegistration(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(
      `${this.managementUrl}${APIConst.EMPLOYEE_REGISTRATION}`,
      param
    );
  }
  updateStatus(param: any) {
    return this.httpClient.put<IAPIWrapper<any>>(
      `${this.managementUrl}${APIConst.UPDATE_STATUS}`,
      param
    );
  }

  updateEmployeeDetails(param:any){
    return this.httpClient.put<IAPIWrapper<any>>(
      `${this.managementUrl}${APIConst.UPDATE_EMPLOYEE}`,
      param
    );
  }
  // Diagnosis apis

  getDiagnosisDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(
      `${this.diagnosisUrl}${APIConst.DIAGNOSIS_DOMAIN}`
    );
  }

  saveDiagnosisDetail(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(
      `${this.diagnosisUrl}${APIConst.DIAGNOSIS_DOMAIN}`,
      param
    );
  }

  deleteDiagnosisDetail(param: any) {
    return this.httpClient.delete(
      `${this.diagnosisUrl}${APIConst.DIAGNOSIS_DOMAIN}`,
      { params: param }
    );
  }
  updateDiagnosisDetail(param: any) {
    return this.httpClient.put<IAPIWrapper<any>>(
      `${this.diagnosisUrl}${APIConst.DIAGNOSIS_DOMAIN}`,
      param
    );
  }

  //Medication apis

  saveMedicationDetails(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(
      `${this.medicationUrl}${APIConst.MEDICATION_DOMAIN}`,
      param
    );
  }

  getMedicationDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(
      `${this.medicationUrl}${APIConst.MEDICATION_DOMAIN}`
    );
  }

  deleteMedicationDetail(param: any) {
    return this.httpClient.delete(
      `${this.medicationUrl}${APIConst.MEDICATION_DOMAIN}`,
      { params: param }
    );
  }
  updateMedicationDetails(param: any) {
    return this.httpClient.put<IAPIWrapper<any>>(
      `${this.medicationUrl}${APIConst.MEDICATION_DOMAIN}`,
      param
    );
  }

  //Procedure
  saveProcedureDetail(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(
      `${this.procedureUrl}${APIConst.PROCEDURE_DOMAIN}`,
      param
    );
  }
  deleteProcedureDetail(param: any) {
    return this.httpClient.delete(
      `${this.procedureUrl}${APIConst.PROCEDURE_DOMAIN}`,
      { params: param }
    );
  }
  getProcDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(
      `${this.procedureUrl}${APIConst.PROCEDURE_DOMAIN}`
    );
  }
  updateProcedureDetail(param: any) {
    return this.httpClient.put<IAPIWrapper<any>>(
      `${this.procedureUrl}${APIConst.PROCEDURE_DOMAIN}`,
      param
    );
  }

  // allergy
  getAllergyDetails() {
    return this.httpClient.get<IAPIWrapper<any>>(
      `${this.allergyUrl}${APIConst.ALLERGY_DETAILS}`
    );
  }
  saveAllergyDetails(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(
      `${this.allergyUrl}${APIConst.ALLERGY_DETAILS}`,
      param
    );
  }
  deletAllergyDetail(param: any) {
    return this.httpClient.delete(
      `${this.allergyUrl}${APIConst.ALLERGY_DETAILS}`,
      { params: param }
    );
  }

  updateAllergyDetails(param: any) {
    return this.httpClient.put<IAPIWrapper<any>>(
      `${this.allergyUrl}${APIConst.ALLERGY_DETAILS}`,
      param
    );
  }

  monthlyData() {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.managementUrl}${APIConst.MONTHLY_WISE_DATA}`);
  }
}
