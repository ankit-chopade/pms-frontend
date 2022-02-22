import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import { FormUtilsService } from '../service/form-util-service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {

  constructor(private formConfig: FormUtilsService, public dialog: MatDialog, private apiCommonService: ApiService) {
  //  super(formConfig., '');
   }
   links = [
    {
      label:'Employee Registration',
      route:'employee-registration'
    },
    {
      label:'Employee Details',
      route:'employee-details'
    },
  ];
  activeLink = this.links[0].label;
  ngOnInit(): void {
    let url = window.location.href;    
    let currentlink = this.links.filter(
      link => link.route === url.substring(url.lastIndexOf('/')+1)
    );
    this.activeLink = currentlink[0].label
  }
  }
  

