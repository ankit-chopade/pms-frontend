import { ControlValueAccessor, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

 import * as _ from 'lodash';

export class FormBaseController<T> implements ControlValueAccessor {
    /**
     * Used to store custom form control as form group.
     */
    form: FormGroup;

    /**
     * Used to store all value changes subscription for value changes.
     */
    subscriptions: Subscription[] = [];

    constructor(private formDetails: FormGroup, private errorMessage?: string) {
        this.form = formDetails;
        this.subscriptions.push(
            this.form.valueChanges.subscribe(value => {
                this.onChange(value);
                this.onTouched();
            })
        );
    }

    /**
     * Used to get control value.
     */
    get value(): T {
        return this.form.value;
    }

    /**
     * Used to set form control value.
     */
    set value(v: T) {
        this.form.setValue(v);
        this.onChange(v);
        this.onTouched();
    }

    /**
     * Used to store on change event.
     */
    onChange: any = () => { };

    /**
     * Used to store on touched event.
     */
    onTouched: any = () => { };

    /**
      * Used to register on change event of control.
      * @param fn Store on change callback function.
      */
    registerOnChange(fn:any) {
        this.onChange = fn;
    }

    /**
     * Used to write a updated value of form control.
     * @param value Used to store value to set.
     */
    writeValue(value:any) {
        if (value) {
            this.value = value;
        }

        if (value === null) {
            this.form.reset();
        }
    }

    /**
     * Used to register on touched event of control.
     * @param fn Used to store callback function of on touched.
     */
    registerOnTouched(fn:any) {
        this.onTouched = fn;
    }

    /**
     * Used to handle validation.
     * @param _ Used to store form control.
     */
    // validate(_: FormControl) {
    //     return this.form.valid ? null : { [this.errorMessage]: { valid: false } };
    // }

    /**
     * used to return control status.
     * @param form used to store target form.
     * @param controlName Store control name.
     * @param dirty Used to store dirty status of control.
     */
    checkTouchedAndInvalid(controlName: string, dirty = false): boolean {
        const controlDetails = this.form.get(controlName);
        if (!controlDetails) {
            return false;
        }
        if (dirty) {
            return controlDetails.touched && controlDetails.invalid && controlDetails.dirty;
        }
        return controlDetails.touched && controlDetails.invalid;
    }

    /**
     * Used to check for error in control.
     * @param form used to store target form.
     * @param controlName Store control name.
     * @param errorKey Store error key.
     */
    checkForErrors(controlName: string, errorKey: string, showOnDirtyOnly = false) {
        const controlDetails = this.form.get(controlName);
        if (!controlDetails) {
            return false;
        }
        if (!controlDetails.errors) {
            return false;
        }

        if (showOnDirtyOnly) {
            if (controlDetails.dirty) {
                return controlDetails.errors[errorKey];
            }
        } else {
            return controlDetails.errors[errorKey];
        }
    }

    /**
     * Used to return value of control.
     * @param controlName Used to store control name.
     * @param innerParam Used to store inner param.
     */
    getControlValue(controlName: string, innerParam?: string) {
        if (!controlName) {
            throw new Error('Provide valid control name.');
        }

        if (!this.form.get(controlName)) {
            throw new Error(`${controlName} not available in form`);
        }

        if (innerParam) {
            if (!this.form.get(controlName)?.value) {
                return null;
            } else {
                if (!this.form.get(controlName)?.value[innerParam]) {
                    return null;
                }
                return this.form.get(controlName)?.value[innerParam];
            }
        } else {
            return this.form.get(controlName)?.value;
        }
    }

    /**
     * Used to return value of control.
     * @param controlName Used to store control name.
     * @param innerParam Used to store inner param.
     */
    setControlValidator(controlName: string, validators: ValidatorFn[]) {
        if (!controlName) {
            throw new Error('Provide valid control name.');
        }

        if (!this.form.get(controlName)) {
            throw new Error(`${controlName} not available in form`);
        }

        if (!validators.length) {
            this.form.get(controlName)?.clearValidators();
            this.form.get(controlName)?.updateValueAndValidity();
            return;
        }

        this.form.get(controlName)?.setValidators(validators);
        this.form.get(controlName)?.updateValueAndValidity();
    }

    /**
     * Used to sset control value
     * @param controlName Used to store control name.
     * @param value Used to store value.
     * @param updateValueAndValidity used to store status update value flag.
     */
    setControlValue(controlName: string, value: any, updateValueAndValidity = true) {
        if (value === undefined) {
            //  throw new Error(`Please provide value for ${controlName}`);
        }

        if (!this.form.get(controlName)) {
            throw new Error(`${controlName} not available in form`);
        }
        this.form.get(controlName)?.setValue(value);
        if (updateValueAndValidity) {
            this.form.get(controlName)?.updateValueAndValidity();
        }
    }

    /**
     * Used to set full form values.
     * @param valueDetails Store value details.
     * @param skipControlList used to name of controls want to skip.
     */
    setFormValue(valueDetails:any, flag?: 'skip' | 'take', skipControlList?: string[]) {
        Object.keys(valueDetails)
            .map(controlName => {
                if (skipControlList) {
                    const controlNameWantToSkip = skipControlList.find(res => res === controlName);
                    if (flag === 'skip') {
                        if (!controlNameWantToSkip) {
                            this.setControlValue(controlName, valueDetails[controlName]);
                        }
                    } else {
                        if (controlNameWantToSkip) {
                            this.setControlValue(controlName, valueDetails[controlName]);
                        }
                    }
                    return;
                }
                this.setControlValue(controlName, valueDetails[controlName]);
            }
            );
        this.form.updateValueAndValidity();
    }

    /**
     * Used to check whether control is valid or not.
     * @param controlName store control name.
     */
    isValid(controlName: string) {
        if (!controlName) {
            throw new Error('Provide value control name.');
        }

        if (!this.form.get(controlName)) {
            throw new Error(`${controlName} not available in form`);
        }

        return this.form.get(controlName)?.valid;
    }

    isDisabled(controlName: string) {
        if (!controlName) {
            throw new Error('Provide value control name.');
        }

        if (!this.form.get(controlName)) {
            throw new Error(`${controlName} not available in form`);
        }

        return this.form.get(controlName)?.disabled;
    }

    /**
     * Used to reset control.
     * @param control Used to save control details.
     */
    // controlReset(control: string | string[]) {
    //     if (isArray(control)) {
    //         control.map(controlName => this.form.get(controlName)?.reset());
    //         this.form.updateValueAndValidity();
    //         return;
    //     }
    //     this.form.get(control)?.reset();
    //     this.form.updateValueAndValidity();
    // }

    /**
     * Used to enable disable control..
     * @param control Used to save control details.
     * @param state Used to store state of control.
     */
    // setControlState(control: string | string[], state: 'enable' | 'disable' = 'disable') {
    //     if (isArray(control)) {
    //         control.map(controlName => {
    //             if (state === 'enable') {
    //                 this.form.get(controlName)?.enable();
    //             } else {
    //                 this.form.get(controlName)?.disable();
    //             }
    //         });
    //         return;
    //     }
    //     if (state === 'enable') {
    //         this.form.get(control)?.enable();
    //     } else {
    //         this.form.get(control)?.disable();
    //     }
    // }
    
    /**
    * Used to delete form control details
    */
    deleteFormArrayControls(formControlName: string) {
        while ((this.form.get(formControlName) as FormArray).length > 0) {
            (this.form.get(formControlName) as FormArray).removeAt(0);
        }
        this.form.updateValueAndValidity();
    }

    formMarkAsTouched() {
        _.each(this.form.controls, function(control) {
            if (control.status === 'INVALID') {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }

}
