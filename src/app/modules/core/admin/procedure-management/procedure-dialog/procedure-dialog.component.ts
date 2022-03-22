import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { FormUtilService } from '../../../patient/service/form-util.service';
import { formErrorMessages } from '../../constants/message.constant';
import { ApiService } from '../../service/api.service';
import { FormUtilsService } from '../../service/form-util-service';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrls: ['./procedure-dialog.component.scss'],
})
export class ProcedureDialogComponent
  extends FormBaseController<any>
  implements OnInit
{
  constructor(
    private formConfig: FormUtilsService,
    private dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<ProcedureDialogComponent>
  ) {
    super(formConfig.procedureDetailsForm, '');
  }
  errorMessages = formErrorMessages;
  procDetails: any[];
  procDesc: any[] = [];
  procCode: any[] = [];
  selectedId: number = 0;
  isHiddenDetails: boolean = true;
  procedureId: number = 0;
  ngOnInit(): void {
    this.procedureId = this.getControlValue('selectedId');
    if(this.procedureId === 0 ||this.procedureId == null)
    {
      this.isHiddenDetails=true
    }
    else{
      this.isHiddenDetails=false
    }
  }

  onCancelClick(): void {
    this.clearModal();
    this.dialogRef.close();
  }

  submit(): void {
    this.procedureId = this.getControlValue('selectedId');
    console.log(this.procedureId === 0);
    if (this.procedureId === 0 || this.procedureId == null) {
      const procedure = {
        procedureCode: this.getControlValue('code'),
        procedureDescription: this.getControlValue('description'),
        procedureIsDepricated: 1,
        // procedureId:this.getControlValue('selectedId')
      };
      console.log(procedure);
      this.apiCommonService.saveProcedureDetail(procedure).subscribe((res) => {
        if (res && res['result'] && res['status'] === 200) {
          this.notifyService.showSuccess('Data added Successfully', 'Success');
        } else {
          this.notifyService.showSuccess('Procedure addition failed', 'Error');
        }
      });
    } else {
      const procedure = {
        procedureCode: this.getControlValue('code'),
        procedureDescription: this.getControlValue('description'),
        procedureIsDepricated: this.getControlValue('isDepricated'),
        procedureId: this.getControlValue('selectedId'),
      };
      console.log(procedure);
      this.apiCommonService
        .updateProcedureDetail(procedure)
        .subscribe((res) => {
          if (res && res['result'] && res['status'] === 200) {
            this.notifyService.showSuccess(
              'Data added Successfully',
              'Success'
            );
          } else {
            this.notifyService.showSuccess(
              'Diagnosis addition failed',
              'Error'
            );
          }
        });
    }

    this.setControlValue('selectedId', this.selectedId);
    this.dialogRef.close(this.form.value);
    this.clearModal();
  }
  clearModal(): void {
    this.setControlValue('code', '');
    this.setControlValue('description', '');
    this.setControlValue('isDepricated', '');
    this.form.reset();
  }
}
