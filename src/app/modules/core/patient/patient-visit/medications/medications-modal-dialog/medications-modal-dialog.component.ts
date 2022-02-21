import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { formErrorMessages } from '../../../constants/message.constant';
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

  errorMessages = formErrorMessages;
  drugDetails: any[];
  drugName: any[] = [];
  drugForm: string[] = [
    'SOLUTION/DROPS',
    'TABLET' ,
    'INJECTABLE' ,
    'UNKNOWN' ,
    'POWDER' ,
    'CAPSULE' ,
    'SUPPOSITORY' ,
    'TABLET, DELAYED RELEASE' ,
    'SYRUP' ,
    'PELLET' ,
    'TABLET, EXTENDED RELEASE' ,
    'CREAM' ,
    'ELIXIR' ,
    'SOAP' ,
    'LOTION' ,
    'CAPSULE, EXTENDED RELEASE' ,
    'EMULSION' ,
    'SUSPENSION' ,
    'LOTION/SHAMPOO' ,
    'OINTMENT' ,
    'FOR SOLUTION' ,
  ];
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
    this.form.reset();
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
  
  autoFillDetailsForDrugId() {
    const drgId: string = this.getControlValue('drgId');
    if(drgId != 'Not-Defined'){
      this.isHiddenDetails = false ;
    }
    if (drgId != '' && drgId != null) {
      this.drugDetails.forEach((element) => {
        if (element.drugId === drgId) {
          this.setControlValue('drgName', element.drugName);
          this.setControlValue('drgGenericName', element.drugGenericName);
          this.setControlValue('drgBrandName', element.drugManufacturerName);
          this.setControlValue('drgForm', element.drugForm);
          this.setControlValue('drgStrength', element.drugStrength);
          this.selectedId = element.medicationId;
        }
      });
    }
  }
   
  autoFillDetailsForDrugName() {
    const drugName: string = this.getControlValue('drgName');
     if (drugName != '' && drugName != null) {
      if(drugName === 'Others'){
        this.isHiddenDetails = true;
      } else{
        this.isHiddenDetails = false;
      }
      this.drugDetails.forEach((element) => {
        if(element.drugName === 'Others' && element.drugName === drugName){
          this.setControlValue('drgId', element.drugId);
          this.selectedId = element.medicationId;
          return;
        } else if (element.drugName === drugName) {
          this.setControlValue('drgId', element.drugId);
          this.setControlValue('drgGenericName', element.drugGenericName);
          this.setControlValue('drgBrandName', element.drugManufacturerName);
          this.setControlValue('drgForm', element.drugForm);
          this.setControlValue('drgStrength', element.drugStrength);
          this.selectedId = element.medicationId;
          return;
        }
      })
    }
  }
}
