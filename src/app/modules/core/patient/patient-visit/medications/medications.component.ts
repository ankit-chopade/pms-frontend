import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { MedicationDetailInterface } from '../patient-modal/MedicationDetailsInterface';
import { MedicationsModalDialogComponent } from './medications-modal-dialog/medications-modal-dialog.component';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
})
export class MedicationsComponent
  extends FormBaseController<any>
  implements OnInit
{
  appointmentId: number = 24; //Static Value

  constructor(
    private formConfig: FormUtilService,
    private dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService
  ) {
    super(formConfig.medicationDetailsForm, '');
  }

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'drugId',
    'drugName',
    'drugGenericName',
    'drugBrandName',
    'drugForm',
    'drugStrength',
    'prescribedDate',
    'delete',
  ];

  ngOnInit(): void {
    this.loadGrid();
  }
  medicationAddButtonClick() {
    console.log('add button click for medications');
    const dialogRef = this.dialog.open(MedicationsModalDialogComponent, {
      width: '250px',
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result['drgId'] && result['drgName']) {
        if (this.validateExistingMedications(result['selectedId']) || result['drgName'] == 'Others') {
          const param: any = {
            appointmentId: this.appointmentId,
            medicationId: result['selectedId'],
            drugId: result['drgId'],
            drugName: result['drgName'],
            drugGenericName: result['drgGenericName'],
            drugManufacturerName: result['drgBrandName'],
            drugForm: result['drgForm'],
            drugStrength: result['drgStrength'],
            medicationDetails: result['details'] == undefined? null : result['details']
          };
          this.saveDrugDetails(param);
        } else {
          this.notifyService.showError('Diagnosis Already Exists', 'Error');
        }
      } 
    });
  }

  validateExistingMedications(selectedId: number): boolean {
    // let data: any = this.dataSource.find(m => d.medicationId == selectedId && m.appointmentId == this.appointmentId)
    let data: any = this.dataSource.find((m) => m.medicationId == selectedId);
    if (data == null) {
      return true;
    }
    return false;
  }

  loadGrid() {
    const param: any = {
      appointmentId: this.appointmentId,
    };
    this.apiCommonService.getMedicationDetailsForPatient(param).subscribe((res) => {
        this.dataSource = res['result'];
        this.dataSource.forEach((element) => {
          let customDate = element.createdDate.split(' ')[0].split('-');
          element.prescribedDate = customDate[2] + '-' + customDate[1] + '-' + customDate[0];
          // element.appointmentId = this.appointmentId; // need to remove this
          element.deleteButton = (element.appointmentId == this.appointmentId) ? "delete" : ""
        });
      });
  }

  deleteMedicationClick(patientMedicationId: number){
    const param : any= {
      patientMedicationId: patientMedicationId
    }
    this.apiCommonService.deleteMedicationDetail(param).subscribe((res) =>{
      if (res && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess("Medication deleted successfully", "Success");
      } else {
        this.notifyService.showError("Medication deletion failed", "Error");
      }
    })
  }

  saveDrugDetails(param: any) {
    this.apiCommonService.saveMedicationDetails(param).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess("Medication added successfully", "Success");
      } else {
        this.notifyService.showSuccess("Medication addition failed", "Error");
      }
    });
  }
}
