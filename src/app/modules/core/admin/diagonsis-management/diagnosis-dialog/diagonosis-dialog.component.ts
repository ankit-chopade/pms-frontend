import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { formErrorMessages } from '../../constants/message.constant';
import { Diagnosis } from '../../models/Diagnosis';
import { ApiService } from '../../service/api.service';
import { FormUtilsService } from '../../service/form-util-service';

@Component({
  selector: 'app-diagonosis-dialog',
  templateUrl: './diagonosis-dialog.component.html',
  styleUrls: ['./diagonosis-dialog.component.scss']
})
export class DiagonosisDialogComponent  extends FormBaseController<any>implements OnInit {
constructor(
  private formConfig: FormUtilsService,
  public dialog: MatDialog,
  public dialogRef: MatDialogRef<DiagonosisDialogComponent>,
  private apiCommonService: ApiService,
  private notifyService: NotificationService
//  @Inject(MAT_DIALOG_DATA) public data: DetailsInterface
) {
  super(formConfig.diagnosisModalDialog, '');
}

errorMessages = formErrorMessages;
diagDetails: any[];
diagDesc: any[] = [];
diagCode: any[] = [];
selectedId: number = 0;
diagnosisId:number=0;
isHiddenDetails: boolean = true;
diagnosisData:Diagnosis
dataSource:Diagnosis[];
diagnosisCode:string;
ngOnInit(): void {
  
  
}

 

onNoClick(): void {
  this.clearModal();
  this.dialogRef.close();
}

submit(): void {
  this.diagnosisId=this.getControlValue('selectedId')
  if(this.diagnosisId===0)
  {
    const diagnosis = { 
      diagnosisCode :this.getControlValue('code'),
      diagnosisDescription:this.getControlValue('description'),
      diagnosisIsDepricated:this.getControlValue('isDepricated'),
    }
   
    this.apiCommonService.saveDiagnosisDetail(diagnosis).subscribe(
      res=>{
        if (res && res['result'] && res['status'] === 200)
        {
          this.notifyService.showSuccess("Data added Successfully","Success")
        }
        else {
          this.notifyService.showSuccess("Diagnosis addition failed", "Error");
        }
      }
      );
  }
  else{
    const diagnosis = { 
      diagnosisCode :this.getControlValue('code'),
      diagnosisDescription:this.getControlValue('description'),
      diagnosisIsDepricated:this.getControlValue('isDepricated'),
      diagnosisId:this.getControlValue('selectedId')
    }

     
    this.apiCommonService.saveDiagnosisDetail(diagnosis).subscribe(
      res=>{
        if (res && res['result'] && res['status'] === 200)
        {
          this.notifyService.showSuccess("Data added Successfully","Success")
        }
        else {
          this.notifyService.showSuccess("Diagnosis addition failed", "Error");
        }
      }
    );
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
