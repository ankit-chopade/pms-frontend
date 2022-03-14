import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorsService implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url=="http://localhost:8989/management/login" || req.url=="http://localhost:8989/management/registration"|| req.url=="http://localhost:8989/management/change-password" || req.url=="http://localhost:8989/management/forgot-password"){
            return next.handle(req)
        }
        let authReq: HttpRequest<any> = req.clone(
            {
                headers: req.headers
                    .set('Content-Type', 'application/json')
                    .set('Access-Control-Allow-Origin', '*')
                    .set('Access-Control-Allow-Headers', 'Content-Type')
                    .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
                    .set('Authorization', "Bearer "+`${sessionStorage.getItem('token')}`)

            }
        );
        return next.handle(authReq).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
            })

        );
    }
}