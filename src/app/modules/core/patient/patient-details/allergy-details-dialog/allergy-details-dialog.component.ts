import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { AllergyDetails } from '../../models/AllergyDetails';
import { FormUtilServie } from '../../service/form-util.service';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-allergy-details-dialog',
  templateUrl: './allergy-details-dialog.component.html',
  styleUrls: ['./allergy-details-dialog.component.scss']
})
export class AllergyDetailsDialogComponent extends FormBaseController<any> implements OnInit {

  allergydata: AllergyDetails[];
  allergydatBackup: AllergyDetails[];
  selectedId: string;
  selectedType:string;
  selectedName:string;
  allergyTypes:string[] =['Animal', 'Bacteria airway', 'Bacteria skin', 'Contact', 'Drug', 'Food', 'Fungi', 'Insect', 'Mite', 'Parasite', 'Plant', 'Vaccine', 'Venom or Salivary', 'Others'];
  constructor(private apiCommonService: ApiService, private formConfig: FormUtilServie, public dialogRef: MatDialogRef<AllergyDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AllergyDetails) {
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
    this.setControlValue('allergyname', allergyDataFromId[0].allergyName);
    this.setControlValue('allergytype', allergyDataFromId[0].allergyType);
    this.setControlValue('allergydesc', allergyDataFromId[0].allergyDescription);
    this.setControlValue('allergyclinicalinfo', allergyDataFromId[0].allergyClinicalInfo);
  }

  getAllergyDetailsByType(){
    if(this.allergydata.length < this.allergydatBackup.length){
      this.allergydata=this.allergydatBackup;
    }
    this.allergydata = this.allergydata.filter(x => x.allergyType == this.selectedType);

  }

  add() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  getAllergyDetailsByName(){
    let allergyDataFromId = this.allergydata.filter(x => x.allergyName == this.selectedName);
    this.setControlValue('allergyid', allergyDataFromId[0].allergyDetailsId);
    this.setControlValue('allergytype', allergyDataFromId[0].allergyType);
    this.setControlValue('allergydesc', allergyDataFromId[0].allergyDescription);
    this.setControlValue('allergyclinicalinfo', allergyDataFromId[0].allergyClinicalInfo);
  }

  // allergyDetails() {
  //  if (this.allergydata == null) {
  //     this.apiCommonService.getAllergyDetails().subscribe(
  //       resp => {
  //         if (resp['status'] === 200 && resp['result'] && resp != null) {
  //           this.allergydata = resp['result'];
  //           console.log(this.allergydata);
  //         }
  //       }
  //     );
  //   }
  // }


}
