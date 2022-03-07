import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private http: HttpClient) {}
  logOut() {
    const param = {
      client_id: 'login-ms',
      client_secret: 'b2dabfcf-e66a-47bc-b3c3-892071c29f1e',
      token: sessionStorage.getItem('token'),
    };
    this.http
      .post(
        'localhost:8180/auth/realms/pms/protocol/openid-connect/revoke',
        param
      )
      .subscribe((result) => console.log('Sign out'));
  }
}
