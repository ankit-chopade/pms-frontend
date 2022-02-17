import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../../service/api.service';
import { FormUtilService } from '../../../service/form-util.service';
import { DetailsInterface } from '../../patient-modal/DetailsInterface';
import { PatientProcedureModalDialogComponent } from '../../procedure/patient-procedure-modal-dialog/patient-procedure-modal-dialog.component';

@Component({
  selector: 'app-diagnosis-modal-dialog',
  templateUrl: './diagnosis-modal-dialog.component.html',
  styleUrls: ['./diagnosis-modal-dialog.component.scss'],
})
export class DiagnosisModalDialogComponent
  extends FormBaseController<any>
  implements OnInit {
  constructor(
    private formConfig: FormUtilService,
    private apiCommonService: ApiService,
    public dialogRef: MatDialogRef<PatientProcedureModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsInterface
  ) {
    super(formConfig.diagnosisModalDialog, '');
  }

  diagDetails: any[];
  diagDesc: any[] = [];
  diagCode: any[] = [];
  selectedId: number = 0;
  isHiddenDetails: boolean = true;

  ngOnInit(): void {
    this.loadDiagnosisDetails();
  }

  loadDiagnosisDetails() {
    this.apiCommonService.getDiagnosisDetails().subscribe(
      res => {
        this.diagDetails = res['result'];
        this.diagDetails.forEach((eachDetails) => {
          if(eachDetails['diagnosisCode'] != 'Not-Defined'){
            this.diagCode.push(eachDetails['diagnosisCode']);
          }
          this.diagDesc.push(eachDetails['diagnosisDescription']);
        });
        // this.diagDesc.push('Others');
      });
      // console.log(this.diagDetails);
  }

  onNoClick(): void {
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
  }

  getSearchValueForDescription() {
    return this.getControlValue('description');
  }
  getSearchValueForCode() {
    return this.getControlValue('code');
  }

  getDiagnosisDescFromInp() {
    const code: string = this.getControlValue('code');
    if (code != '' && code != null) {
      this.diagDetails.forEach(element => {
        if (element.diagnosisCode === code) {
          this.setControlValue('description', element.diagnosisDescription);
          this.setControlValue('isDepricated', element.diagnosisIsDepricated + ""); // change the integer 0 1 to yes no
          this.selectedId = element.diagnosisId;
        }
      });
    }
  }

  getDiagnosisCodeFromInp() {
    const description: string = this.getControlValue('description');
    if (description === 'Others') {
      this.isHiddenDetails = false;
    }  
    if (description != '' && description != null) {
      this.diagDetails.forEach(element => {
        if (element.diagnosisDescription === description) {
          this.setControlValue('code', element.diagnosisCode);
          this.setControlValue('isDepricated', element.diagnosisIsDepricated + "");
          this.selectedId = element.diagnosisId;
        }
      });
    }
  }
}