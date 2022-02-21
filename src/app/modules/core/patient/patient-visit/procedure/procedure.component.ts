import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { DetailsInterface } from '../patient-modal/DetailsInterface';
import { PatientProcedureModalDialogComponent } from './patient-procedure-modal-dialog/patient-procedure-modal-dialog.component';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss'],
})
export class ProcedureComponent
  extends FormBaseController<any>
  implements OnInit
{
  appointmentId: number = 24; //Static Value
  
  constructor(
    private formConfig: FormUtilService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService
  ) {
    super(formConfig.procedureDetailsForm, '');
  }

  dataSource: any[] = [
    // {code:'A001', description:'Sample Drug', isDepricated:'yes'}
  ];
  // dataSource:DetailsInterface[] =
  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricate',
    'prescribedDate',
    'delete',
  ];


  ngOnInit(): void {
    this.loadGrid();
  }

  procedureAddButtonClick() {
    // call api for loading data in proc code and proc description

    const dialogRef = this.dialog.open(PatientProcedureModalDialogComponent, {
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
        if (this.validateExistingProcedure(result['selectedId']) || result['description'] == 'Others') {
          const param: any = {
            procedureId: result['selectedId'],
            appointmentId: this.appointmentId,
            code: result['code'],
            description: result['description'],
            isDepricated: result['isDepricated'],
            procedureDetails: result['details'] == undefined ? null : result['details']
          };
          this.saveProcDetails(param);
        } else {
          this.notifyService.showError('Procedure already exists', 'Error');
        }
      }
    });
  }

  validateExistingProcedure(selectedId: number): boolean {
    let data: any = this.dataSource.find(p => p.procedureId == selectedId && p.appointmentId == this.appointmentId)
    if (data == null) {
      return true;
    }
    return false;
  }

  loadGrid() {
    const param: any = {
      appointmentId: this.appointmentId,
    };
    this.apiCommonService.getProcDetailsForPatient(param).subscribe((res) => {
      this.dataSource = res['result'];
      this.dataSource.forEach((element) => {
        element.procedureIsDepricated = element.procedureIsDepricated == 0 ? 'Yes' : 'No';
        let customDate = element.createdDate.split(' ')[0].split('-');
        element.prescribedDate = customDate[2] + '-' + customDate[1] + '-' + customDate[0];
        // element.appointmentId = this.appointmentId; // need to be removed
        element.deleteButton = element.appointmentId == this.appointmentId ? 'delete' : '';
      });
      // console.log(this.dataSource);
    });
  }

  deleteProcedureClick(patientProcedureId: number) {
    const param: any = {
      patientProcedureId: patientProcedureId,
    };
    this.apiCommonService.deleteProcedureDetail(param).subscribe((res) => {
      if (res && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess(
          'Procedure deleted successfully',
          'Success'
        );
      } else {
        this.notifyService.showError('Procedure deletion failed', 'Error');
      }
    });
  }

  saveProcDetails(param: any) {
    // console.log("save procedure details called")
    this.apiCommonService.saveProcDetailsForPatient(param).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess(
          'Procedure added successfully',
          'Success'
        );
      } else {
        this.notifyService.showSuccess('Procedure addition failed', 'Error');
      }
    });
  }
}
