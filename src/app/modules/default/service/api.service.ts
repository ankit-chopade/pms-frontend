import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAPIWrapper } from '../../common/interfaces/api-wrapper.interface';
import { APIConst } from '../constant/api.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {
  }

  login(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.VALIDATE_USER}`,param);

  }
  getMenus(param: any) {
    return this.httpClient.post<IAPIWrapper<any>>(`${this.baseUrl}${APIConst.GET_MENUS}`,param);

  }

 
}
