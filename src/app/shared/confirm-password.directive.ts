import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]'
})
export class ConfirmPasswordDirective implements Validator {

  @Input() appConfirmPassword:string;
  validate(control: AbstractControl): ValidationErrors | null {
    console.log("Validators")
    const controlToCompare=control.parent?.get(this.appConfirmPassword);
    if(controlToCompare && controlToCompare.value!=control.value)
        return {'notEqual':true}
    return null;


  }

}
