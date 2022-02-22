import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { EmployeeDetail } from '../../models/EmployeeDetail';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private apiCommonService: ApiService,private notifyService: NotificationService,private router: Router) { }
employeedata:EmployeeDetail
  ngOnInit(): void {
  //   const roleId={
  //     'roleId':3
  //   }
  //   this.apiCommonService.EmployeeDetails(roleId).subscribe(
  //     res => {
  //       if (res && res['result'] && res['status'] === 200) {
  //         alert("Success");
  //         this.employeedata= res['result']
          
  //       }
  //       else {
  //         alert("Failed");
  //       }
  //     }
  //   );
   }

}
