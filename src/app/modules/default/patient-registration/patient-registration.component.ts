import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent {

  
  //Registration Form
  firstname:string="";
  lastName:string="";
  email:string="";
  cnumber:number=0;
  password_reg:string="";
  confirmPassword_reg:string="";
  flag_pwd:boolean=true;
  dob:Date=new Date();
  form_user: number=0;
  constructor() {
  } 
  

  patientRegistration : FormGroup = new FormGroup({
    firstname:new FormControl("", Validators.required),
    lastName:new FormControl("", Validators.required),
    email :  new FormControl("", Validators.email),
    cnumber :  new FormControl("", [Validators.required,Validators.pattern("\\d{10}")]),
    password_reg: new FormControl("", [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
    confirmPassword_reg:new FormControl("", Validators.required),
   },
    
  );

submitregistrationForm()
{
  alert("Patient registered.");
}

checkpwd()
{
  if(this.password_reg == this.confirmPassword_reg)
  {
    this.flag_pwd =true;
  }
  else{
    this.flag_pwd=false;
  }
}

}
