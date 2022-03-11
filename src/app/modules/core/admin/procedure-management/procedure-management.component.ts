import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { procedure } from '../models/procedure';
import { ApiService } from '../service/api.service';
import { FormUtilsService } from '../service/form-util-service';
import { ProcedureDialogComponent } from './procedure-dialog/procedure-dialog.component';

@Component({
  selector: 'app-procedure-management',
  templateUrl: './procedure-management.component.html',
  styleUrls: ['./procedure-management.component.scss']
})
export class ProcedureManagementComponent extends FormBaseController<any> implements OnInit {

  constructor(private formConfig: FormUtilsService,
    private dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService,
  ) {
    super(formConfig.procedureDetailsForm, '');
  }
  dataSource: MatTableDataSource<any>
  @ViewChild('paginator') paginator : MatPaginator 
  // dataSource:DetailsInterface[] =
  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricated',
    'delete',
  ];


  ngOnInit(): void {
    this.loadGrid();
  }

  procedureAddButtonClick() {
    // call api for loading data in proc code and proc description
    this.form.reset();
    const dialogRef = this.dialog.open(ProcedureDialogComponent, {
      width: '350px',
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadGrid()
    });
  }

  validateExistingProcedure(selectedId: number): boolean {
    // let data: any = this.dataSource.find(p => p.procedureId == selectedId && p.appointmentId == this.appointmentId)
    // if (data == null) {
    //   return true;
    // }
    return false;
  }

  loadGrid() {

    this.apiCommonService.getProcDetails().subscribe((res) =>{
      this.dataSource = new MatTableDataSource(res['result']);
      this.dataSource.paginator=this.paginator;
    });
  }

   editClick(procedure:procedure)
   {
     console.log(procedure)
     this.setControlValue('code', procedure.procedureCode);
     this.setControlValue('description', procedure.procedureDescription);
     this.setControlValue('isDepricated', procedure.procedureIsDepricated+"");
     this.setControlValue('selectedId', procedure.procedureId);
    const dialogRef = this.dialog.open(ProcedureDialogComponent, {
      width: '350px',
      data: this.dataSource,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadGrid()
    });
   }
   delete(procedure:procedure)
   {
     const param : any= {
    id: procedure.procedureId
  }
  console.log(param)
   this.apiCommonService.deleteProcedureDetail(param).subscribe((res) =>{
    // if (res && res['status'] === 200) {
       this.loadGrid();
       this.notifyService.showSuccess("Diagnosis deleted successfully", "Success");
    //  } else {
    //    this.notifyService.showError("Diagnosis deletion failed", "Error");
    //  }
   })
   
   }
}