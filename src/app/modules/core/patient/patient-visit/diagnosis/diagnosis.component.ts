import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { DetailsInterface } from '../patient-modal/DetailsInterface';
import { DiagnosisModalDialogComponent } from './diagnosis-modal-dialog/diagnosis-modal-dialog.component';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
})
export class DiagnosisComponent
  extends FormBaseController<any>
  implements OnInit
{
  appointmentId: number = 2; //Static Value

  constructor(
    private formConfig: FormUtilService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService
  ) {
    super(formConfig.diagnosisDetailsForm, '');
  }

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricate',
    'prescribedDate',
    'delete'
  ];
  ngOnInit(): void {
    this.loadGrid();
  }

  diagnosisAddButtonClick() {
    const dialogRef = this.dialog.open(DiagnosisModalDialogComponent, {
      width: '350px',
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (
        result &&
        result['code'] &&
        result['description'] &&
        result['isDepricated']
      ) {
        if (this.validateExistingDiagnosis(result['selectedId']) || result['description'] == 'Others') {
          // console.log(result);
          const param: any = {
            diagnosisId: result['selectedId'],
            appointmentId: this.appointmentId, //Passing Static Value
            diagnosisCode: result['code'],
            diagnosisDescription: result['description'],
            diagnosisIsDepricated: result['isDepricated'],
            diagnosisDetails: result['details']== undefined ? null : result['details']
          };
          this.saveDiagnosisDetails(param);
        } else {
          this.notifyService.showError('Diagnosis Already Exists', 'Error');
        }
      }
    });
  }

  validateExistingDiagnosis(selectedId: number): boolean {
    let data: any = this.dataSource.find(d => d.diagnosisId == selectedId && d.appointmentId == this.appointmentId)
    if (data == null) {
      return true;
    }
    return false;
  }

  loadGrid() {
    const param: any = {
      id: this.appointmentId
    };
    this.apiCommonService.getDiagnosisDetailsForPatient(param).subscribe(
      (res) => {
        this.dataSource = res['result'];
        this.dataSource.forEach((element) => {
          element.diagnosisIsDepricated = element.diagnosisIsDepricated == 0 ? 'Yes' : 'No';
          let customDate = element.createdDate.split(' ')[0].split('-');
          element.prescribedDate = customDate[2] + '-' + customDate[1] + '-' + customDate[0];
          element.deleteButton = (element.appointmentId == this.appointmentId) ? "delete" : ""
        });
      });
  }

  deleteDiagnosisClick(patientDiagnosisId: number){
    const param : any= {
      patientDiagnosisId: patientDiagnosisId
    }
    this.apiCommonService.deleteDiagnosisDetail(param).subscribe((res) =>{
      if (res && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess("Diagnosis deleted successfully", "Success");
      } else {
        this.notifyService.showError("Diagnosis deletion failed", "Error");
      }
    })
  }

  saveDiagnosisDetails(param: any) {
    this.apiCommonService.saveDiagnosisDetails(param).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess("Diagnosis added successfully", "Success");
      } else {
        this.notifyService.showSuccess("Diagnosis addition failed", "Error");
      }
    });
  }
}
