import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { DetailsInterface } from '../patient-modal/DetailsInterface';
import { DiagnosisModalDialogComponent } from './diagnosis-modal-dialog/diagnosis-modal-dialog.component';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent extends FormBaseController<any> implements OnInit {

  appointmentId: number = 24 //Static Value

  constructor(private formConfig: FormUtilService, public dialog: MatDialog, private apiCommonService: ApiService) {
    super(formConfig.diagnosisDetailsForm, '');
  }

  dataSource: any[] = [
    // {code:'A001', description:'Sample Drug', isDepricated:'yes'}
  ];
  displayedColumns: string[] = ['code', 'description', 'isDepricate'];
  ngOnInit(): void {
    this.loadGrid("3");
  }

  diagnosisAddButtonClick() {
    const dialogRef = this.dialog.open(DiagnosisModalDialogComponent, {
      width: '350px',
      data: this.dataSource
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result['code'] && result['description'] && result['isDepricated']) {
        const param: any = {

          diagnosisId: result['selectedId'],
          appointmentId: this.appointmentId, //Passing Static Value
        //  appointmentId: result['appointmentId'],
          diagnosisCode: result['code'],
          diagnosisDescription: result['description'],
          diagnosisIsDepricated: result['isDepricated']

        }
        this.saveDiagnosisDetails(param);
      }
    });
  }
  //   dialogRef.afterClosed().subscribe(result => {
  //       if(result && result['code'] && result['description']&& result['isDepricated']){
  //         const param : any = {
  //           result
  //         }
  //       }
  //   });
  // }

  loadGrid(userId: string) {
    const param: any = {
      appointmentId: this.appointmentId
    }
    this.apiCommonService.getDiagnosisDetailsForPatient(param).subscribe(
      res => {
        this.dataSource = res['result'];
        this.dataSource.forEach(element => {
          element.diagnosisIsDepricated = element.diagnosisIsDepricated == 0 ? 'Yes' : 'No';
        }
        )
      }
    );
  }
  saveDiagnosisDetails(param: any) {
    this.apiCommonService.saveDiagnosisDetails(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.loadGrid(param.userId)
        }
        else {
          //Error Message
        }
      }
    );
  }
}
