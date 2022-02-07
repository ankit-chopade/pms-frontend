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
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.DOCTOR}`);
  } 

  savePatientAppintment(param:any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.SAVE_APPOINTMENT}`,param);
  } 


}
