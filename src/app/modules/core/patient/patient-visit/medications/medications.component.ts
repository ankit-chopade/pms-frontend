import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { MedicationDetailInterface } from '../patient-modal/MedicationDetailsInterface';
import { MedicationsModalDialogComponent } from './medications-modal-dialog/medications-modal-dialog.component';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent extends FormBaseController<any> implements OnInit {

  appointmentId: number = 24 //Static Value

  constructor(private formConfig: FormUtilService, private dialog: MatDialog, private apiCommonService: ApiService) {
    super(formConfig.medicationDetailsForm, '');
  }

  dataSource: MedicationDetailInterface[] = [];
  displayedColumns: string[] = ['drugId', 'drugName', 'drugGenericName', 'drugBrandName', 'drugForm', 'drugStrength']
  ngOnInit(): void {
    this.loadGrid(this.appointmentId);
  }
  medicationAddButtonClick() {
    console.log("add button click for medications");
    const dialogRef = this.dialog.open(MedicationsModalDialogComponent, {
      width: '250px',
      data: this.dataSource
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result['drgId'] && result['drgName']) {
        const param: any = {
          appointmentId: this.appointmentId,
          medicationId: result['selectedId'],
          drugId: result['drgId'],
          drugName: result['drgName'],
          drugGenericName: result['drgGenericName'],
          drugManufacturerName: result['drgBrandName'],
          drugForm: result['drgForm'],
          drugStrength: result['drgStrength'],

        }
        this.saveDrugDetails(param);
      }
    });
  }

  loadGrid(appointmentId: number) {
    const param: any = {
      appointmentId: appointmentId,
    }
    this.apiCommonService.getMedicationDetailsForPatient(param).subscribe(
      res => {
        this.dataSource = res['result'];
      }
    );
  }

  saveDrugDetails(param: any) {
    this.apiCommonService.saveMedicationDetails(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.loadGrid(this.appointmentId)
        }
        else {

        }
      }
    );
  }
}
