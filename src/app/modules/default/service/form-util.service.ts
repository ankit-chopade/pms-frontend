import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Injectable({
    providedIn: 'root'
})

export class FormUtilServie {

    fb = new FormBuilder();

    loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
    });

    changePasswordForm = this.fb.group({
        username: ["", Validators.email],
        oldpassword: ["", Validators.required],
        password: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
        confirmpassword: ["", Validators.required],
    });

    forgotPasswordForm = this.fb.group({
        username: ["", Validators.email]
    });

    registrationForm = this.fb.group({
        title:["",Validators.required],
        firstname:["",Validators.required],
        lastname: ["", Validators.required],
        dob: ["", Validators.required],
        username :   ["", Validators.email],
        contactnumber :   ["", [Validators.required,Validators.pattern("\\d{10}")]],
        password:  ["", [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
        confirmpassword: ["", Validators.required,],
    });




}