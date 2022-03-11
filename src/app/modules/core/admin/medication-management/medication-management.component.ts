import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { FormUtilService } from '../../patient/service/form-util.service';
import { medication } from '../models/medication';
import { ApiService } from '../service/api.service';
import { FormUtilsService } from '../service/form-util-service';
import { MadicationDialogComponent } from './madication-dialog/madication-dialog.component';

@Component({
  selector: 'app-medication-management',
  templateUrl: './medication-management.component.html',
  styleUrls: ['./medication-management.component.scss'],
})
export class MedicationManagementComponent
  extends FormBaseController<any>
  implements OnInit
{
  constructor(
    private formConfig: FormUtilsService,
    private dialog: MatDialog,
    private apiCommonService: ApiService,

    private notifyService: NotificationService
  ) {
    super(formConfig.medicationDetailsForm, '');
  }

  @ViewChild('paginator') paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'drugId',
    'drugName',
    'drugGenericName',
    'drugBrandName',
    'drugForm',
    'drugStrength',
    // 'prescribedDate',
    'delete',
  ];

  ngOnInit(): void {
    this.loadGrid();
  }
  medicationAddButtonClick() {
    this.form.reset();
    // console.log('add button click for medications');
    const dialogRef = this.dialog.open(MadicationDialogComponent, {
      width: '250px',
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadGrid();
    });
    //   if (result && result['drgId'] && result['drgName']) {
    //     if (this.validateExistingMedications(result['selectedId']) || result['drgName'] == 'Others') {
    //       const param: any = {
    //         appointmentId: this.appointmentId,
    //         medicationId: result['selectedId'],
    //         drugId: result['drgId'],
    //         drugName: result['drgName'],
    //         drugGenericName: result['drgGenericName'],
    //         drugManufacturerName: result['drgBrandName'],
    //         drugForm: result['drgForm'],
    //         drugStrength: result['drgStrength'],
    //         medicationDetails: result['details'] == undefined? null : result['details']
    //       };
    //       this.saveDrugDetails(param);
    //     } else {
    //       this.notifyService.showError('Diagnosis Already Exists', 'Error');
    //     }
    //   }
    // });
  }

  loadGrid() {
    this.apiCommonService.getMedicationDetails().subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.dataSource = new MatTableDataSource(res['result']);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteClick(Medication: medication) {
    const param: any = {
      id: Medication.medicationId,
    };
    this.apiCommonService.deleteMedicationDetail(param).subscribe((res) => {
      this.loadGrid();
      this.notifyService.showSuccess(
        'Medication deleted successfully',
        'Success'
      );
    });
  }
  editClick(medicationdata: medication) {
    this.setControlValue('drgId', medicationdata.drugId);
    this.setControlValue('drgName', medicationdata.drugName);
    this.setControlValue('drgGenericName', medicationdata.drugGenericName);
    this.setControlValue('drgBrandName', medicationdata.drugManufacturerName);
    this.setControlValue('drgForm', medicationdata.drugForm);
    this.setControlValue('drgStrength', medicationdata.drugStrength);
    this.setControlValue('selectedId', medicationdata.medicationId);
    const dialogRef = this.dialog.open(MadicationDialogComponent, {
      width: '250px',
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadGrid();
    });
  }
}
