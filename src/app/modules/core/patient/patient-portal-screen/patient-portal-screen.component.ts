import { Component, OnInit , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-patient-portal-screen',
  templateUrl: './patient-portal-screen.component.html',
  styleUrls: ['./patient-portal-screen.component.scss']
})
export class PatientPortalScreenComponent implements OnInit {

 dataSource :MatTableDataSource<any>;

 columnsToDisplay: string[] = ['userId','title','firstName','lastName','details'];
 @ViewChild('paginator') paginator : MatPaginator ;
 @ViewChild(MatSort, { static: false }) set sort(s: MatSort) {
   if(this.dataSource!=undefined){
    this.dataSource.sort = s;
   }
  }
 
  constructor(private matDialog:MatDialog ,private router :Router ,private service :ApiService) { }
  
  ngOnInit(): void {
    
    this.service.patients().subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.dataSource = new MatTableDataSource(res['result']);
          this.dataSource.paginator = this.paginator;
         }
       }
     );     
  }
  sortData(sort : MatSort){
    this.sort = sort;
  }
  popup_click(userId:any){   
      
    this.router.navigate(['/dashboard/patient/details',userId])
    
  }
  goToPatientDetails(patientId: number) {
    this.router.navigate(
      ['../dashboard/patient/patient-details/', patientId],
      {
        skipLocationChange: true,
      }
    );
  }

}
