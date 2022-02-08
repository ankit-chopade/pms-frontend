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

  constructor(private formConfig: FormUtilService, private dialog: MatDialog, private apiCommonService: ApiService) {
    super(formConfig.medicationDetailsForm, '');
  }

  dataSource: MedicationDetailInterface[] =[];
  displayedColumns: string[] = ['drugId', 'drugName', 'drugGenericName', 'drugBrandName', 'drugForm', 'drugStrength']
  ngOnInit(): void {
    this.loadGrid("3");
  }
  medicationAddButtonClick(){
    console.log("add button click for medications");
    const dialogRef = this.dialog.open(MedicationsModalDialogComponent, {
      width: '250px',
      data: this.dataSource
    });
    dialogRef.afterClosed().subscribe( result => {
      if(result && result['drugId'] && result['drug']&& result['isDepricated']){
        const param : any = {
          result: [{
            id:result['id'],
            drugId : result['drugId'],
            drugName : result['drugName'],
            drugGenericName : result['drugGenericName'],
            drugBrandName : result['drugBrandName'],
            drugForm : result['drugForm'],
            drugStrength: result['drugStrength'],
          }]
        }
        this.saveDrugDetails(param);
      }
    });
  }

  loadGrid(userId : string){
    const param : any = {
      patientId: userId
    }
    this.apiCommonService.getMedicationDetailsForPatient(param).subscribe(
      res => {
        this.dataSource = res['result'];
      }
    );
  }

  saveDrugDetails(param:any){
    this.apiCommonService.saveMedicationDetails(param).subscribe(
      res => {
        this.loadGrid(param.userId)
      }
    );
  }
}
