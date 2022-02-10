import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIWrapper } from '../../../common/interfaces/api-wrapper.interface';
import { APIConst } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.baseUrl;


  constructor(private httpClient: HttpClient) {
  }
  
  getPhysician() {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PHYSICIAN}`);
  } 

  savePatientAppintment(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.SAVE_APPOINTMENT}`,param);
  } 

  getPhysicianAppintments(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PHYSICIAN_APPOINTMENTS}`,param);
  } 

  saveEditedAppointemnt(param:any){
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.EDIT_APPOINTMENT}`,param);
  }
  
  deletePhysicianAppintments(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DELETE_PHYSICIAN_APPOINTMENT}`,param);
  } 

  saveEditHistory(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.SAVE_EDIT_HISTORY}`,param);
  } 

  getEditHistory(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_EDIT_HISTORY}`,param);
  } 

}
