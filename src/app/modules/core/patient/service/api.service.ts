import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    // console.log(param)
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT_DETAILS}`, param);
  }

  getAllergyDetailsById(param:any){
    // console.log(param)
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.ALLERGY_DETAILS_BY_ID}`,{params:param});
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
 
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.SAVE_ALLERGY_DETAILS}`,param);
  }

  getAllergyDetailsbyCodeDetails(param:any){
 
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_ALLERGY_DETAILS}`,{params:param});
  }
  // deletePatientAllegy(param:any){
  //   return this.httpClient.delete<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DELETE_PATIENT_ALLERGY}`,{params:param});
  // }
}
