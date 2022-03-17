import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../../service/api.service';
import { FormUtilsService } from '../../service/form-util-service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent  extends FormBaseController<any> implements OnInit {

  columnsToDisplay: string[] = ['userId','title','firstName','lastName','createdDate','status','editStatus'];
  employeedata:MatTableDataSource<any>;
  @ViewChild('paginator') paginator : MatPaginator ;
  @ViewChild(MatSort, { static: false }) set sort(s: MatSort) {
    this.employeedata.sort = s;
  }
  status:string
  param:any ={userId :0 , active:0}
  constructor(
    private formConfig: FormUtilsService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService,
    private router: Router) 
    {
      super(formConfig.empEditDialog, '');
    } 
  
  ngOnInit(): void {
   this.loadEmployeeData();  
  }
  
  loadEmployeeData(){
    this.apiCommonService.employeeDetails().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
         this.employeedata= new MatTableDataSource( res['result'] );        
         this.employeedata.paginator = this.paginator;         
         console.log(res['result']);
       
       }
      }
     );
    }
  updateStatus(id:any,status:any) {
    this.param.userId = id;
    this.param.active =status;
    this.apiCommonService.updateStatus(this.param).subscribe 
    (res => {
      if (res && res['result'] && res['status'] === 200) {
        this.notifyService.showSuccess("status updated succesfully","Success");   
         this.loadEmployeeData();
      }
      else  {this.notifyService.showError("failed","Error");}
    }
   
  );
  
    console.log(this.param)

  }
  filterData($event:any){
    this.employeedata.filter = $event.target.value;
  }
  sortData(sort : MatSort){
    this.sort = sort;
  } 

  editClick(employee:any){
    console.log(employee);
    
    this.setControlValue('userId', employee.userId);
    this.setControlValue('title', employee.title);
    this.setControlValue('firstName', employee.firstName);
    this.setControlValue('lastName', employee.lastName);
    
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadEmployeeData();
    });
  }
  
}
