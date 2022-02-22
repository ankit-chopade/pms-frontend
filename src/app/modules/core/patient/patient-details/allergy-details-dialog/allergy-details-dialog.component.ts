import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { AllergyDetails } from '../../models/AllergyDetails';
import { FormUtilService } from '../../service/form-util.service';
import { ApiService } from '../../service/api.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-allergy-details-dialog',
  templateUrl: './allergy-details-dialog.component.html',
  styleUrls: ['./allergy-details-dialog.component.scss']
})
export class AllergyDetailsDialogComponent extends FormBaseController<any> implements OnInit {

  allergydata: AllergyDetails[];
  allergydatBackup: AllergyDetails[];
  selectedId: string;
  selectedType: string;
  selectedName: string;
  allergyTypes: string[] = ['Animal', 'Bacteria airway', 'Bacteria skin', 'Contact', 'Drug', 'Food', 'Fungi', 'Insect', 'Mite', 'Parasite', 'Plant', 'Vaccine', 'Venom or Salivary', 'Others'];
  flag: boolean = false;

  constructor(private apiCommonService: ApiService, private formConfig: FormUtilService, public dialogRef: MatDialogRef<AllergyDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AllergyDetails) {
    super(formConfig.allergyDetailsForm);
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.apiCommonService.getAllergyDetails().subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.allergydata = resp['result'];
          this.allergydatBackup = resp['result'];
        }
      }
    );
  }



  getAllergyDetailsById() {
    let allergyDataFromId = this.allergydata.filter(x => x.allergyDetailsId == this.selectedId);
    this.setControlValue('allergyName', allergyDataFromId[0].allergyName);
    this.setControlValue('allergyType', allergyDataFromId[0].allergyType);
    this.setControlValue('allergyDescription', allergyDataFromId[0].allergyDescription);
    this.setControlValue('allergyClinicalInfo', allergyDataFromId[0].allergyClinicalInfo);
  }

  getAllergyDetailsByType() {
    this.allergydata = this.allergydatBackup;

    if (this.selectedType != "Others") {
      this.allergydata = this.allergydata.filter(x => x.allergyType == this.selectedType);
      this.flag = false;

    }

    else {
      this.flag = true;
      this.setControlValue('allergyId', "");
      this.setControlValue('allergyName', "");
      this.setControlValue('allergyDescription', "");
      this.setControlValue('allergyClinicalInfo', "");
    }

  }

  add() {
    this.dialogRef.close(this.form.value);
    this.setControlValue('allergyId', "");
    this.setControlValue('allergyName', "");
    this.setControlValue('allergyType', "");
    this.setControlValue('allergyDescription', "");
    this.setControlValue('allergyClinicalInfo', "");
  }

  cancel() {
    this.clear()
    this.dialogRef.close();
  }
  clear() {
    this.setControlValue('allergyId', "");
    this.setControlValue('allergyName', "");
    this.setControlValue('allergyType', "");
    this.setControlValue('allergyDescription', "");
    this.setControlValue('allergyClinicalInfo', "");
  }

  getAllergyDetailsByName() {
    let allergyDataFromId = this.allergydata.filter(x => x.allergyName == this.selectedName);
    this.setControlValue('allergyId', allergyDataFromId[0].allergyDetailsId);
    this.setControlValue('allergyType', allergyDataFromId[0].allergyType);
    this.setControlValue('allergyDescription', allergyDataFromId[0].allergyDescription);
    this.setControlValue('allergyClinicalInfo', allergyDataFromId[0].allergyClinicalInfo);

  }

}
