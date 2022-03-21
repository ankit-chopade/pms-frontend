import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { Diagnosis } from '../models/Diagnosis';
import { ApiService } from '../service/api.service';
import { FormUtilsService } from '../service/form-util-service';
import { DiagnosisDialogComponent } from './diagnosis-dialog/diagnosis-dialog.component';

@Component({
  selector: 'app-diagnosis-management',
  templateUrl: './diagnosis-management.component.html',
  styleUrls: ['./diagnosis-management.component.scss'],
})
export class DiagnosisManagementComponent
  extends FormBaseController<any>
  implements OnInit {
  constructor(
    private formConfig: FormUtilsService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService
  ) {
    super(formConfig.diagnosisModalDialog, '');
  }
  @ViewChild('paginator') paginator: MatPaginator;

  id: number = 0;
  diagnosisData: Diagnosis[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricate',
    'delete',
  ];
  ngOnInit(): void {
    this.loadGrid();
  }

  diagnosisAddButtonClick() {
    this.form.reset();
    const dialogRef = this.dialog.open(DiagnosisDialogComponent, {
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe(() => {

      this.loadGrid();

    });
  }

  validateExistingDiagnosis(selectedId: number): boolean {
    if (selectedId === 0) {
      return true;
    }
    let data: any = this.diagnosisData.find(
      (d) => d.diagnosisId === selectedId
    );
    if (data == null) {
      return true;
    }
    return false;
  }

  loadGrid() {
    this.apiCommonService.getDiagnosisDetails().subscribe((res) => {
      this.diagnosisData = res['result'];
      this.dataSource = new MatTableDataSource(res['result']);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteDiagnosisClick(diagnosis: Diagnosis) {
    const param: any = {
      id: diagnosis.diagnosisId,
    };
    console.log(param);
    this.apiCommonService.deleteDiagnosisDetail(param).subscribe((res) => {
      this.loadGrid();
      this.notifyService.showSuccess(
        'Diagnosis deleted successfully',
        'Success'
      );
     
    });
  }

  editClick(diagnosis: Diagnosis) {
    console.log(diagnosis);
    this.setControlValue('code', diagnosis.diagnosisCode);
    this.setControlValue('description', diagnosis.diagnosisDescription);
    this.setControlValue('isDepricated', diagnosis.diagnosisIsDepricated + '');
    this.setControlValue('selectedId', diagnosis.diagnosisId);
    console.log(this.getControlValue('isDepricated'));
    const dialogRef = this.dialog.open(DiagnosisDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadGrid();
    });
  }
}
