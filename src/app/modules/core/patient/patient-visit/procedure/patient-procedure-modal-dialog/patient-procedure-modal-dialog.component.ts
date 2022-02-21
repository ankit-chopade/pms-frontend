import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { formErrorMessages } from '../../../constants/message.constant';
import { ApiService } from '../../../service/api.service';
import { FormUtilService } from '../../../service/form-util.service';
import { DetailsInterface } from '../../patient-modal/DetailsInterface';
/**
 * @param  {'app-patient-procedure-modal-dialog'} {selector
 * @param  {'./patient-procedure-modal-dialog.component.html'} templateUrl
 * @param  {['./patient-procedure-modal-dialog.component.scss']}} styleUrls
 */
@Component({
  selector: 'app-patient-procedure-modal-dialog',
  templateUrl: './patient-procedure-modal-dialog.component.html',
  styleUrls: ['./patient-procedure-modal-dialog.component.scss'],
})
/**
 * @param  {PatientFormUtilService} privateformConfig
 * @param  {MatDialogRef<PatientProcedureModalDialogComponent>} publicdialogRef
 * @param  {} @Inject(MAT_DIALOG_DATA)
 * @param  {ProcedureInterface} publicdata
 */
export class PatientProcedureModalDialogComponent
  extends FormBaseController<any>
  implements OnInit {
  constructor(
    private formConfig: FormUtilService,
    private apiCommonService: ApiService,
    public dialogRef: MatDialogRef<PatientProcedureModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsInterface
  ) {
    super(formConfig.patientProcedureModalDialog, '');
  }
  errorMessages = formErrorMessages;
  procDetails: any[];
  procDesc: any[] = [];
  procCode: any[] = [];
  selectedId: number = 0;
  isHiddenDetails: boolean = true;

  ngOnInit(): void {
    this.loadProcedureDetails();
  }
  loadProcedureDetails(){
    this.apiCommonService.getProcDetails().subscribe((res) => {
      this.procDetails = res['result'];
      this.procDetails.forEach((eachDetails) => {
        if(eachDetails['procedureCode'] != 'Not-Defined'){
          this.procCode.push(eachDetails['procedureCode']);
        }
        this.procDesc.push(eachDetails['procedureDescription']);
        // console.log(this.procDesc);
      });
      // this.procDesc.push('Others');

      // console.log("ProcDetails" + JSON.stringify(this.procDetails))
      // }
    });
  }
  onCancelClick(): void {
    this.clearModal();
    this.dialogRef.close();
  }

  submit(): void {
    this.setControlValue('selectedId', this.selectedId);
    this.dialogRef.close(this.form.value);
    this.clearModal();

  }
  clearModal(): void {
    this.setControlValue('code', '');
    this.setControlValue('description', '');
    this.setControlValue('isDepricated', '');
    this.setControlValue('details','');
    this.form.reset();
  }

  getSearchValueForDescription() {
    return this.getControlValue('description');
  }
  getSearchValueForCode() {
    return this.getControlValue('code');
  }
  // getProcDescFromInp1(){
  //   console.log("code  " + this.getControlValue('code'));
  //   // this.setControlValue('description', 'sample');
  //   // this.setControlValue('isDepricated', 'no');
  //   const param : any = {
  //     code:this.getControlValue('code')
  //   };
  //   if(param.code != '' && param.code != null)
  //   this.apiCommonService.getProcDetailsForProcCode(param).subscribe(
  //     res => {
  //       console.log("******"+JSON.stringify(res));
  //       // description =
  //       if(res && res['result']){
  //         if(this.getControlValue('description') == null || this.getControlValue('description') == ''){
  //           this.setControlValue('description', res['result'].description);
  //           this.setControlValue('isDepricated', res['result'].isDepricated);
  //         }
  //       }
  //     }
  //   );
  // }
  getProcDescFromInp() {
    const code: string = this.getControlValue('code');
    if(code != 'Not-Defined'){
        this.isHiddenDetails = true;
    }
    if (code != '' && code != null) {
      console.log(this.procDetails);
      this.procDetails.forEach((element) => {
        if (element.procedureCode === code) {
          this.setControlValue('description', element.procedureDescription);
          this.setControlValue('isDepricated', element.procedureIsDepricated + "");
          this.selectedId = element.procedureId;
        }
      });
    }
  }
  // getProcCodeFromInp1(){
  //   console.log("description  " + this.getControlValue('description'));
  //   // this.setControlValue
  //   const param : any = {
  //     description:this.getControlValue('description')
  //   };
  //   if(param.description != '' && param.description != null)
  //   this.apiCommonService.getProcCodeForProcDesc(param).subscribe(
  //     res => {
  //       console.log(res);
  //       if(res && res['result']){
  //         this.setControlValue('code', res['result'].code);
  //         this.setControlValue('isDepricated', res['result'].isDepricated);
  //       }
  //     }
  //   );
  // }
  getProcCodeFromInp() {
    const description: string = this.getControlValue('description');
    if (description === 'Others') {
      this.isHiddenDetails = false;
    } else {
      this.isHiddenDetails = true;
    }
    if (description != '' && description != null) {
        this.procDetails.forEach((element) => {
          if (element.procedureDescription === description) {
            this.setControlValue('code', element.procedureCode);
            this.setControlValue('isDepricated', element.procedureIsDepricated + "");
            this.selectedId = element.procedureId;
          }
        });
      }
  }
}
