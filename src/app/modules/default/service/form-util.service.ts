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

    changePassForm = this.fb.group({
        change_email: ["", Validators.email],
        password_change_pwd: ["", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
        confirmPassword_change_pwd: ["", Validators.required],
    });




}