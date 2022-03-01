import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  columnsToDisplay: string[] = ['id','title','first_name','last_name','dateofjoining','status','action'];
  employeedata:MatTableDataSource<any>;
  @ViewChild('paginator') paginator : MatPaginator ;
  @ViewChild(MatSort) matSort : MatSort;
  status:string
  param:any ={userId :0 , active:0}
  constructor(private apiCommonService: ApiService,private notifyService: NotificationService,private router: Router) { }
  
  ngOnInit(): void {
    this.loadEmployeeData();
    this.apiCommonService.employeeDetails().subscribe(
       res => {
         if (res && res['result'] && res['status'] === 200) {
          this.employeedata= new MatTableDataSource( res['result'] ); 
          this.employeedata.paginator = this.paginator;
          this.employeedata.sort = this.matSort;          
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
        this.notifyService.showSuccess("status updated succesfully","status");
      }
      else  {this.notifyService.showSuccess("failed","status");}
    }
   
  );
    console.log(this.param)

  }
  filterData($event:any){
    this.employeedata.filter = $event.target.value;
  }
  loadEmployeeData(){
    this.apiCommonService.employeeDetails().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
         this.employeedata= new MatTableDataSource( res['result'] ); 
        //  this.employeedata.paginator = this.paginator;
        //  this.employeedata.sort = this.matSort;          
        }
      }
   );
  }
}
