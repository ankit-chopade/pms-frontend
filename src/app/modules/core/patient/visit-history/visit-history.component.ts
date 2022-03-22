import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';


@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.scss']
})
export class VisitHistoryComponent implements OnInit {
  displayedColumns: string[] = ['appointmentId', 'subject', 'dateOfAppointment','startTime', 'physicianName','action'];
  dataSource:MatTableDataSource<any>;
  userId:any;
  constructor(private apiService: ApiService ,private router: Router) {

  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem("userId")
    this.loadData()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
  }

  loadData() {

    const param: any = {
      id: +this.userId,
      date: new Date()
    };
    this.apiService.getAllVisitsDetails(param).subscribe(res => {
      if (res && res['result'] && res['status'] === 200) {
        let data:any[]= res['result']
        data.forEach(obj=>{
          obj.dateOfAppointment= obj.startTime
        })
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }

    })
  }
  view(appointmentId:Number){
    this.router.navigate(['../dashboard/patient/vital-signs/view',appointmentId],{
        skipLocationChange:true
    });
   
  }

}


