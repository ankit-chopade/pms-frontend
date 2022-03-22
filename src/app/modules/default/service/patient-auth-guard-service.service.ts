import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ServiceConstants } from "./service.constants";

@Injectable({
    providedIn: 'root'
})
export class PatientAuthGuardService implements CanActivate{
    constructor(private router: Router){ }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(sessionStorage.getItem("roleId")!= ""+ServiceConstants.ROLE.PATIENT) {
            this.router.navigate(['../unauthorized']);
            return false;
        }
        else {
            return true;
        }
    }
    
}