import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ServiceConstants } from "./service.constants";

@Injectable({
    providedIn: 'root'
})
export class PatientPhysicianNurseAuthGuardService implements CanActivate{
    constructor(private router: Router){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(sessionStorage.getItem("roleId") == ""+ServiceConstants.ROLE.PHYSICIAN || sessionStorage.getItem("roleId") == ""+ServiceConstants.ROLE.NURSE|| sessionStorage.getItem("roleId") == ""+ServiceConstants.ROLE.PATIENT) {
            return true;
        }
        else {
            this.router.navigate(['../unauthorized']);
            return false;
        }
    }
    
}