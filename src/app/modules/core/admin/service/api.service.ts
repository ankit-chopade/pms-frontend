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
 

  

 

}
