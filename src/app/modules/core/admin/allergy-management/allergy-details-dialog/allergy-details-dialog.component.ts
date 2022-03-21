import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { AllergyDetails } from '../../models/AllergyDetails';

import { ApiService } from '../../service/api.service';
import { FormUtilsService } from '../../service/form-util-service';

@Component({
  selector: 'app-allergy-details-dialog',
  templateUrl: './allergy-details-dialog.component.html',
  styleUrls: ['./allergy-details-dialog.component.scss'],
})
export class AllergyDetailsDialogComponent
  extends FormBaseController<any>
  implements OnInit
{
  allergydata: AllergyDetails[];
  allergydatBackup: AllergyDetails[];
  selectedId: string;
  allergyId: number = 0;
  selectedAllergyId: number = 0;
  selectedType: string;
  selectedName: string;
  allergyTypes: string[] = [
    'Animal',
    'Bacteria airway',
    'Bacteria skin',
    'Contact',
    'Drug',
    'Food',
    'Fungi',
    'Insect',
    'Mite',
    'Parasite',
    'Plant',
    'Vaccine',
    'Venom or Salivary',
    'Others',
  ];
  flag: boolean = false;

  constructor(
    private formConfig: FormUtilsService,
    //  private dialog: MatDialog,
    private apiCommonService: ApiService,
    public dialogRef: MatDialogRef<AllergyDetailsDialogComponent>,
    private notifyService: NotificationService
  ) {
    super(formConfig.allergyDetailsForm, '');
  }

  @ViewChild('paginator') paginator: MatPaginator;

  ngOnInit(): void {
    this.apiCommonService.getAllergyDetails().subscribe((resp) => {
      if (resp['status'] === 200 && resp['result'] && resp != null) {
        this.allergydata = resp['result'];
        console.log(resp);
        console.log(this.allergydata);
        this.allergydatBackup = resp['result'];
      }
    });
  }

  getAllergyDetailsByType() {
    this.allergydata = this.allergydatBackup;

    if (this.selectedType != 'Others') {
      this.allergydata = this.allergydata.filter(
        (x) => x.allergyType == this.selectedType
      );
      //  this.flag = false;
    } else {
      this.flag = true;
      this.setControlValue('allergyCode', '');
      this.setControlValue('allergyName', '');
      this.setControlValue('allergyDescription', '');
      this.setControlValue('allergyClinicalInfo', '');
    }
  }

  add() {
    this.allergyId = this.getControlValue('selectedId');
    console.log(this.allergyId === 0);
    if (this.allergyId === 0 || this.allergyId == null) {
      const allergy = {
        allergyCode: this.getControlValue('allergyCode'),
        allergyName: this.getControlValue('allergyName'),
        allergyType: this.getControlValue('allergyType'),
        allergyDescription: this.getControlValue('allergyDescription'),
        allergyClinicalInfo: this.getControlValue('allergyClinicalInfo'),
        // allergyId:this.getControlValue('selectedId')
      };
      this.apiCommonService.saveAllergyDetails(allergy).subscribe((res) => {
        if (res && res['result'] && res['status'] === 200) {
          this.notifyService.showSuccess('Data added Successfully', 'Success');
        } else {
          this.notifyService.showError('Addition failed', 'Error');
        }
      },
      (err)=>{
        this.notifyService.showError(err['error'].message, 'Error');
      });
    } else {
      const allergy = {
        allergyCode: this.getControlValue('allergyCode'),
        allergyName: this.getControlValue('allergyName'),
        allergyType: this.getControlValue('allergyType'),
        allergyDescription: this.getControlValue('allergyDescription'),
        allergyClinicalInfo: this.getControlValue('allergyClinicalInfo'),
        allergyId: this.getControlValue('selectedId'),
      };
      this.apiCommonService.updateAllergyDetails(allergy).subscribe((res) => {
        if (res && res['result'] && res['status'] === 200) {
          this.notifyService.showSuccess('Data  Successfully', 'Success');
        } else {
          this.notifyService.showError('Updation failed', 'Error');
        }
      });
    }
    this.setControlValue('allergyId', this.selectedAllergyId);
    this.dialogRef.close(this.form.value);
    this.clear();
  }

  cancel() {
    this.clear();
    this.dialogRef.close();
  }
  clear() {
    this.setControlValue('allergyCode', '');
    this.setControlValue('allergyName', '');
    this.setControlValue('allergyType', '');
    this.setControlValue('allergyDescription', '');
    this.setControlValue('allergyClinicalInfo', '');
  }

  getAllergyDetailsByName() {
    let allergyDataFromId = this.allergydata.filter(
      (x) => x.allergyName == this.selectedName
    );
    this.setControlValue('allergyCode', allergyDataFromId[0].allergyCode);
    this.setControlValue('allergyType', allergyDataFromId[0].allergyType);
    this.setControlValue(
      'allergyDescription',
      allergyDataFromId[0].allergyDescription
    );
    this.setControlValue(
      'allergyClinicalInfo',
      allergyDataFromId[0].allergyClinicalInfo
    );
    this.selectedAllergyId = allergyDataFromId[0].allergyId;
  }
}
