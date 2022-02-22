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

  EmployeeDetails(param:any) {
    return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.EMPLOYEE_DETAILS}`,{params:param});
  }


  

 

}
