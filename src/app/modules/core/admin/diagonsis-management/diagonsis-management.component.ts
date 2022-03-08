import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { Diagnosis } from '../models/Diagnosis';
import { ApiService } from '../service/api.service';
import { FormUtilsService } from '../service/form-util-service';
import { DiagonosisDialogComponent } from './diagnosis-dialog/diagonosis-dialog.component';


@Component({
  selector: 'app-diagonsis-management',
  templateUrl: './diagonsis-management.component.html',
  styleUrls: ['./diagonsis-management.component.scss']
})
export class DiagonsisManagementComponent  extends FormBaseController<any> implements OnInit {

  constructor(
    private formConfig: FormUtilsService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService
  ) {
    super(formConfig.diagnosisModalDialog, '');
  }
  @ViewChild('paginator') paginator : MatPaginator ;
  
  id:number=0;
  diagnosisData:Diagnosis[];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricate',
   // 'prescribedDate',
    'delete'
  ];
  ngOnInit(): void {
    this.loadGrid();
  }

  diagnosisAddButtonClick() {
    const dialogRef = this.dialog.open(DiagonosisDialogComponent, {
      width: '350px',
      data: this.dataSource,
    });
     dialogRef.afterClosed().subscribe((result) => { 
        if (result != null) {
          
      this.loadGrid();
  }
});
}
    
  

  validateExistingDiagnosis(selectedId: number): boolean {
    if(selectedId===0)
    {
       return true;
    }
     let data: any = this.diagnosisData.find(d => d.diagnosisId===selectedId)
    if (data == null) {
       return true;
     }
     return false;
  }

  loadGrid() {
    
      this.apiCommonService.getDiagnosisDetails().subscribe(
        (res) => {
          this.diagnosisData=res['result']
          this.dataSource = new MatTableDataSource(res['result']);
          this.dataSource.paginator=this.paginator;
       
        });
  }

  deleteDiagnosisClick(diagnosis: Diagnosis){
    const param : any= {
      diagnosisId: diagnosis.diagnosisId
      
    }
    console.log(param)
     this.apiCommonService.deleteDiagnosisDetail(param).subscribe((res) =>{
      // if (res && res['status'] === 200) {
         this.loadGrid();
         this.notifyService.showSuccess("Diagnosis deleted successfully", "Success");
      //  } else {
      //    this.notifyService.showError("Diagnosis deletion failed", "Error");
      //  }
     })
  }

  // saveDiagnosisDetails(param: any) {
  //   console.log(param)
  //   this.apiCommonService.saveDiagnosisDetail(param).subscribe((res) => {
  //     if (res && res['result'] && res['status'] === 200) {
  //       this.loadGrid();
  //       this.notifyService.showSuccess("Diagnosis added successfully", "Success");
  //     } else {
  //       this.notifyService.showSuccess("Diagnosis addition failed", "Error");
  //     }
  //   });
  // }
  editClick(diagnosis:Diagnosis)
  {
    console.log(diagnosis)
    this.setControlValue('code', diagnosis.diagnosisCode);
    this.setControlValue('description', diagnosis.diagnosisDescription);
    this.setControlValue('isDepricated', diagnosis.diagnosisIsDepricated+"");
    
    this.setControlValue('selectedId', diagnosis.diagnosisId);
    console.log(this.getControlValue('isDepricated'));
    const dialogRef = this.dialog.open(DiagonosisDialogComponent, {
      width: '350px',
    
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadGrid()
    });
    
  }
}

 

