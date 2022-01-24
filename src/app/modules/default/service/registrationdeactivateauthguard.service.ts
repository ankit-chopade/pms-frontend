import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientRegistrationComponent } from '../patient-registration/patient-registration.component';

@Injectable({
  providedIn: 'root'
})
export class RegistrationdeactivateauthguardService implements CanDeactivate<PatientRegistrationComponent>{

  constructor() { }
  canDeactivate(component: PatientRegistrationComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.confirmExit()
  }
}