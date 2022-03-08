import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { FormUtilService } from '../../../patient/service/form-util.service';
import { formErrorMessages } from '../../constants/message.constant';
import { ApiService } from '../../service/api.service';
import { FormUtilsService } from '../../service/form-util-service';

@Component({
  selector: 'app-madication-dialog',
  templateUrl: './madication-dialog.component.html',
  styleUrls: ['./madication-dialog.component.scss']
})
export class MadicationDialogComponent extends FormBaseController<any> implements OnInit {

  constructor(
    private formConfig: FormUtilsService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    public dialogRef: MatDialogRef<MadicationDialogComponent>,
    private notifyService: NotificationService
    //   @Inject(MAT_DIALOG_DATA) public data: MedicationDetailInterface
  ) {
    super(formConfig.medicationDetailsForm, '');
  }

  errorMessages = formErrorMessages;
  drugDetails: any[];
  drugName: any[] = [];
  drugForm: string[] = [
    'SOLUTION/DROPS',
    'TABLET',
    'INJECTABLE',
    'UNKNOWN',
    'POWDER',
    'CAPSULE',
    'SUPPOSITORY',
    'TABLET, DELAYED RELEASE',
    'SYRUP',
    'PELLET',
    'TABLET, EXTENDED RELEASE',
    'CREAM',
    'ELIXIR',
    'SOAP',
    'LOTION',
    'CAPSULE, EXTENDED RELEASE',
    'EMULSION',
    'SUSPENSION',
    'LOTION/SHAMPOO',
    'OINTMENT',
    'FOR SOLUTION',
  ];
  drugId: any[] = [];
  drugBrandName: any[] = [];
  drugStrength: any[] = [];
  selectedId: number = 0;
  isHiddenDetails: boolean = false;
  medicationId: number = 0;


  ngOnInit(): void {
    this.loadMedicationsData();
  }

  loadMedicationsData() {
    this.apiCommonService.getMedicationDetails().subscribe((res) => {
      this.drugDetails = res['result'];
      this.drugDetails.forEach((eachDetails) => {
        if (eachDetails['drugId'] != 'Not-Defined') {
          this.drugId.push(eachDetails['drugId']);
          // this.drugForm.push(eachDetails['drugForm']);
        }
        this.drugName.push(eachDetails['drugName']);
      });
    });
    // this.drugForm.filter((n,i) => this.drugForm.indexOf(n) === i);
  }

  onCancelClick() {
    this.clearModal();
    this.dialogRef.close();
  }

  submit(): void {
    this.medicationId = this.getControlValue('selectedId')
    console.log(this.medicationId === 0)
    if (this.medicationId === 0) {
      const medication = {
        drugName: this.getControlValue('drgName'),
        drugId: this.getControlValue('drgId'),
        drugGenericName: this.getControlValue('drgGenericName'),
        drugManufacturerName: this.getControlValue('drgBrandName'),
        drugForm: this.getControlValue('drgForm'),
        drugStrength: this.getControlValue('drgStrength'),
      }
      console.log(medication);
      this.apiCommonService.saveMedicationDetails(medication).subscribe(
        res => {
          if (res && res['result'] && res['status'] === 200) {
            this.notifyService.showSuccess("Data added Successfully", "Success")
            this.loadMedicationsData();
          }
          else {
            this.notifyService.showSuccess("Diagnosis addition failed", "Error");
          }
        }
      );
    }
   else{
    const medication = {
      drugName: this.getControlValue('drgName'),
      drugId: this.getControlValue('drgId'),
      drugGenericName: this.getControlValue('drgGenericName'),
      drugManufacturerName: this.getControlValue('drgBrandName'),
      drugForm: this.getControlValue('drgForm'),
      drugStrength: this.getControlValue('drgStrength'),
      medicationId:this.getControlValue('selectedId')
    }
    console.log(medication);
    this.apiCommonService.saveMedicationDetails(medication).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.notifyService.showSuccess("Data added Successfully", "Success")
          this.loadMedicationsData();
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
    this.setControlValue('drgId', '');
    this.setControlValue('drgName', '');
    this.setControlValue('drgGenericName', '');
    this.setControlValue('drgBrandName', '');
    this.setControlValue('drgForm', '');
    this.setControlValue('drgStrength', '');
    this.setControlValue('details', '');
    this.form.reset();
  }





}
