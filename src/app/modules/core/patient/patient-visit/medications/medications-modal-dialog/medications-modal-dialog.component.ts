import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../../service/api.service';
import { FormUtilService } from '../../../service/form-util.service';
import { MedicationDetailInterface } from '../../patient-modal/MedicationDetailsInterface';

@Component({
  selector: 'app-medications-modal-dialog',
  templateUrl: './medications-modal-dialog.component.html',
  styleUrls: ['./medications-modal-dialog.component.scss']
})
export class MedicationsModalDialogComponent extends FormBaseController<any> implements OnInit {

  constructor(
    private formConfig: FormUtilService,
    private apiCommonService: ApiService,
    public dialogRef: MatDialogRef<MedicationsModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MedicationDetailInterface
  ) {
    super(formConfig.medicationModalDialog, '');
  }

  drugDetails: any[];
  drugName: any[] = [];
  drugForm: any[] = [];
  drugId: any[] = [];
  drugBrandName: any[] = [];
  drugStrength: any[] = [];
  selectedId: number = 0;
  isHiddenDetails: boolean = false;
  

  ngOnInit(): void {
    this.loadMedicationsData();
  }

  loadMedicationsData() {
    this.apiCommonService.getMedicationDetails().subscribe((res) => {
      this.drugDetails = res['result'];
      this.drugDetails.forEach((eachDetails) => {
        if(eachDetails['drugId'] != 'Not-Defined'){
          this.drugId.push(eachDetails['drugId']);
        }
        this.drugName.push(eachDetails['drugName']);
      });
      // this.drugName.push('Others');
    });
  }

  onCancelClick() {
    this.clearModal();
    this.dialogRef.close();
  }

  submit(): void {
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
    this.setControlValue('details','');
  }

  getDrugIdFromField() {
    return this.getControlValue('drgId');
  }
  getDrugNameFromField() {
    return this.getControlValue('drgName');
  }
  getDrugBrandNameFromField() {
    return this.getControlValue('drgBrandName');
  }
  getDrugFormFromField() {
    return this.getControlValue('drgForm');
  }

  getDrugStrengthFromField() {
    return this.getControlValue('drgStrength');
  }
  // autoFillDetailsForDrugId1(){
  //   const param:any = {
  //     drugId: this.getControlValue('drgId')
  //   };
  //   if(param.drugId != '' && param.drugId != null)
  //   this.apiCommonService.getDrugDetailsForDrugId(param).subscribe(
  //     res => {
  //       console.log(res);
  //       if(res && res['result']) {
  //         // if()
  //         this.setControlValue('drgName', res['result'].drugName);
  //         this.setControlValue('drgGenericName', res['result'].drugGenericName);
  //         this.drugBrandName = (res['result'].drugBrandName).split(",");
  //         this.drugForm = (res['result'].drugForm).split(";");
  //         this.drugStrength = (res['result'].drugStrength).split(";");
  //         // this.setControlValue('drgBrandName', res['result'].drugBrandName);
  //         // this.setControlValue('drgName', res['result'].)
  //       }
  //     }
  //   );
  // }
  autoFillDetailsForDrugId() {
    const drgId: string = this.getControlValue('drgId');
    if (drgId != '' && drgId != null) {
      this.drugDetails.forEach((element) => {
        if (element.drugId === drgId) {
          this.setControlValue('drgName', element.drugName);
          this.setControlValue('drgGenericName', element.drugGenericName);
          this.drugBrandName = element.drugManufacturerName.split(';');
          this.drugForm = element.drugForm.split(';');
          this.drugStrength = element.drugStrength.split(';');
          this.selectedId = element.medicationId;
        }
      });
    }
  }
  // autoFillDetailsForDrugName1(){
  //   const param:any = {
  //     drugName: this.getControlValue('drgName')
  //   };
  //   this.apiCommonService.getDrugDetailsForDrugName(param).subscribe(
  //     res => {
  //       console.log(res);
  //       if(res && res['result']){
  //         this.setControlValue('drgId', res['result'].drugId);
  //         this.setControlValue('drgGenericName', res['result'].drugGenericName);
  //         this.drugBrandName = (res['result'].drugBrandName).split(",");
  //         this.drugForm = (res['result'].drugForm).split(";");
  //         this.drugStrength = (res['result'].drugStrength).split(";");
  //       }
  //     }
  //   );
  // }
  autoFillDetailsForDrugName() {
    const drugName: string = this.getControlValue('drgName');
     if (drugName != '' && drugName != null) {
      // this.drugDetails.forEach((element) => {
      if(drugName === 'Others'){
        this.isHiddenDetails = true;
      } else{
        this.isHiddenDetails = false;
      }
      this.drugDetails.forEach((element) => {
        if(element.drugName === 'Others' && element.drugName === drugName){
          // this.isHiddenDetails = true;
          this.setControlValue('drgId', element.drugId);
          this.selectedId = element.medicationId;
          return;
        } else if (element.drugName === drugName) {
          // this.isHiddenDetails = false;
          this.setControlValue('drgId', element.drugId);
          this.setControlValue('drgGenericName', element.drugGenericName);
          this.drugBrandName = element.drugManufacturerName.split(';');
          this.drugForm = element.drugForm.split(';');
          this.drugStrength = element.drugStrength.split(';');
          this.selectedId = element.medicationId;
          return;
        }
      })
    }
  }
}
