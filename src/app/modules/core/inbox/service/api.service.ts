import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAPIWrapper } from "src/app/modules/common/interfaces/api-wrapper.interface";
import { environment } from "src/environments/environment";
import { APIConst } from "../constant/api.constant";

@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
  
    private baseUrl = environment.baseUrl;
  
  
    constructor(private httpClient: HttpClient) {
    }

    getAppointmentDetailsToPatient(param:any){
        return this.httpClient.get<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.PATIENT_APPOINTMENT_DETAILS}`, {params:param});
      }
    
    }