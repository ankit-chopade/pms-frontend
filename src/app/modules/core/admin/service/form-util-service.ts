import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class FormUtilsService {
    [x: string]: any;
    fb = new FormBuilder();

    registrationForm = this.fb.group({
        title:["",Validators.required],
        firstname:["",Validators.required],
        lastname: ["", Validators.required],
        dob: ["", Validators.required],
        emailid :   ["", Validators.email],
        contactnumber :   ["", [Validators.required,Validators.pattern("\\d{10}")]],
        role: ["", Validators.required],
        employeeId: ["", Validators.required],
    });


}