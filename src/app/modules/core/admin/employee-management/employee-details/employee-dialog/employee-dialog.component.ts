import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { formErrorMessages } from '../../../constants/message.constant';
import { DiagnosisDialogComponent } from '../../../diagnosis-management/diagnosis-dialog/diagnosis-dialog.component';
import { ApiService } from '../../../service/api.service';
import { FormUtilsService } from '../../../service/form-util-service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent extends FormBaseController<any>
implements OnInit
{
constructor(
  private formConfig: FormUtilsService,
  public dialog: MatDialog,
  public dialogRef: MatDialogRef<DiagnosisDialogComponent>,
  private apiCommonService: ApiService,
  private notifyService: NotificationService
) //  @Inject(MAT_DIALOG_DATA) public data: DetailsInterface
{
  super(formConfig.empEditDialog, '');
}

errorMessages = formErrorMessages;
diagDetails: any[];
diagDesc: any[] = [];
diagCode: any[] = [];
empId: number = 0;


disabled:boolean=true
// diagnosisData: Diagnosis;
// dataSource: Diagnosis[];
diagnosisCode: string;

ngOnInit(): void {
  this.empId = this.getControlValue('userId');
  
}

onNoClick(): void {
  this.clearModal();
  this.dialogRef.close();
}

submit(): void {
  this.empId = this.getControlValue('userId');
  if (this.empId !=0 || this.empId != null) {
    const emp = {
      userId: this.getControlValue('userId'),
      title: this.getControlValue('title'),
      firstName: this.getControlValue('firstName'),
      lastName: this.getControlValue('lastName'),
    };

    this.apiCommonService.updateEmployeeDetails(emp).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.notifyService.showSuccess('Employee updated Successfully', 'Success');
      } else {
        this.notifyService.showError('failed', 'Error');
      }
    });
  } else {
    const emp = {
      userId: this.getControlValue('userId'),
      title: this.getControlValue('title'),
      firstName: this.getControlValue('firstName'),
      lastName: this.getControlValue('lastName'),
    };

    this.apiCommonService
      .updateEmployeeDetails(emp)
      .subscribe((res) => {
        if (res && res['result'] && res['status'] === 200) {
          this.notifyService.showSuccess(
            'Data added Successfully',
            'Success'
          );
        } else {
          this.notifyService.showError(
            'failed',
            'Error'
          );
        }
      });
  }

  this.setControlValue('userId', this.empId);
  this.dialogRef.close(this.form.value);

  this.clearModal();
}
clearModal(): void {
  this.setControlValue('userId', '');
  this.setControlValue('title', '');
  this.setControlValue('firstName', '');
  this.setControlValue('lastName', '');
  this.form.reset();
}
}