import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  implements OnInit {
  appointmentId: number //Static Value
  isEdit: boolean = true
  action: string;

  constructor(
    private formConfig: FormUtilService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    super(formConfig.procedureDetailsForm, '');
  }

  data: any[] = []
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricate',
    'prescribedDate',
    'delete',
  ];


  ngOnInit(): void {
    if (this.route.snapshot.params["id"] != undefined) {
      this.appointmentId = this.route.snapshot.params["id"]
      this.action = this.route.snapshot.params["action"]
      if (this.action == "view")
        this.isEdit = false;
      else
        this.isEdit = true;
    }
    this.loadGrid();
  }

  procedureAddButtonClick() {
    const dialogRef = this.dialog.open(PatientProcedureModalDialogComponent, {
      // width: '350px',
      data: this.data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (
        result &&
        result['code'] &&
        result['description']
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
    let data: any = this.data.find(p => p.procedureId == selectedId && p.appointmentId == this.appointmentId)
    if (data == null) {
      return true;
    }
    return false;
  }

  loadGrid() {
    const param: any = {
      id: this.appointmentId,
    };
    this.apiCommonService.getProcDetailsForPatient(param).subscribe((res) => {
      this.data = res['result'];
      this.data.forEach((element) => {
        element.procedureIsDepricated = element.procedureIsDepricated == 0 ? 'Yes' : 'No';
        let customDate = element.createdDate.split(' ')[0].split('-');
        element.prescribedDate = customDate[2] + '-' + customDate[1] + '-' + customDate[0];
        // element.appointmentId = this.appointmentId; // need to be removed
        element.deleteButton = element.appointmentId == this.appointmentId ? 'delete' : '';
      });
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
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
  nextButtonClick() {
    this.router.navigate(['../dashboard/patient/medications/',this.action, this.appointmentId], {
      skipLocationChange: true
    });
  }
  previousButtonClick() {
    this.router.navigate(['../dashboard/patient/diagnosis/',this.action, this.appointmentId], {
      skipLocationChange: true
    });
  }
}
