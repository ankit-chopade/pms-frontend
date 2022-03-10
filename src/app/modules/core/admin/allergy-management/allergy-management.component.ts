import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { AllergyDetails } from '../models/AllergyDetails';
import { ApiService } from '../service/api.service';
import { FormUtilsService } from '../service/form-util-service';
import { AllergyDetailsDialogComponent } from './allergy-details-dialog/allergy-details-dialog.component';

@Component({
  selector: 'app-allergy-management',
  templateUrl: './allergy-management.component.html',
  styleUrls: ['./allergy-management.component.scss']
})
export class AllergyManagementComponent extends FormBaseController<any> implements OnInit {

  constructor(private formConfig: FormUtilsService,
    private dialog: MatDialog,
    private apiCommonService: ApiService,

    private notifyService: NotificationService
  ) {
    super(formConfig.allergyDetailsForm, '');
  }

  @ViewChild('paginator') paginator : MatPaginator ;
  
  dataSource: MatTableDataSource<any>;
  allergycolumns: string[] = ['allergyid', 'allergytype', 'allergyname', 'allergydesc', 'allergyclinicalinfo','delete'];
  ngOnInit(): void {
    this.loadGrid()
  }
  addAllergies() {
    const dialogRef = this.dialog.open( AllergyDetailsDialogComponent, {
      width: '300px',
      disableClose: true,
     

    }
    );
    dialogRef.afterClosed().subscribe(
      resp => {
        this.loadGrid();
        if (resp != null) {
         console.log(resp);
          
        
        //  this.apiCommonService.saveAllergyDetails(resp).subscribe(
        //   res => {
        //     if (res && res['result'] && res['status'] === 200) {
        //       this.notifyService.showSuccess("Data added Successfully", "Success")
        //       this.loadGrid();
        //     }
        //     else {
        //       this.notifyService.showSuccess("Addition failed", "Error");
        //     }
        //   }
        // );
         
        }
      }
    );
  }

  loadGrid() {
    // console.log(this.allergydatasource)
    this.apiCommonService.getAllergyDetails().subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = new MatTableDataSource(resp['result']);
          this.dataSource.paginator=this.paginator;
        }
      }
    );
  
  }
  delete(id:number){
    const param : any= {
      allergyId: id
    }
    this.apiCommonService.deletAllergyDetail(param).subscribe((res) =>{
     
      this.loadGrid();
      this.notifyService.showSuccess(" Deleted successfully", "Success");
    } 
  );
  }
  editClick(allergy:AllergyDetails)
  {
    this.setControlValue('allergyCode', allergy.allergyCode);
    this.setControlValue('allergyType', allergy.allergyType);
    this.setControlValue('allergyName', allergy.allergyName);
    this.setControlValue('allergyDescription', allergy.allergyDescription);
    this.setControlValue('allergyClinicalInfo', allergy.allergyClinicalInfo);
    this.setControlValue('selectedId', allergy.allergyId);
    const dialogRef = this.dialog.open(AllergyDetailsDialogComponent, {
      width: '250px',
      
    });
     dialogRef.afterClosed().subscribe((result) => {
      this.loadGrid();
     }
     );
  }
}
