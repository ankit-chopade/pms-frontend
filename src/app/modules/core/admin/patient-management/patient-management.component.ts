import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss']
})
 export class PatientManagementComponent implements OnInit{// ,OnChanges
  columnsToDisplay: string[] = ['userId', 'title', 'firstName', 'lastName', 'dateofregistration', 'status', 'editStatus'];
  patientData:MatTableDataSource<any>;
  @ViewChild('paginator') paginator :MatPaginator ;
  @ViewChild(MatSort, { static: false }) set sort(s: MatSort) {
    this.patientData.sort = s;
}
  param:any ={userId :0 , active:null}
 
  constructor(private service: ApiService, private notifyService: NotificationService, private router: Router) { }
    
  ngOnInit(): void 
  {
     this.loadPatientDetails();    
  }
   
  updateStatus(id:any,status:any) {
    this.param.userId = id;
    this.param.active =status;
    this.service.updateStatus(this.param).subscribe 
    (res => {
      if (res && res['result'] && res['status'] === 200) {
        this.notifyService.showSuccess("status updated succesfully","Success");
        this.loadPatientDetails();
      }
      else  {this.notifyService.showError("failed","Error");}
      }
     );
  } 
 
   public loadPatientDetails(){
    this.service.patientDetails().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.patientData = new MatTableDataSource(res['result']);
          this.patientData.paginator = this.paginator;
        }
      }
    );
   }

   filterData($event : any){
    this.patientData.filter = $event.target.value;
   }
   sortData(sort : MatSort){
    this.sort = sort;
   }
}