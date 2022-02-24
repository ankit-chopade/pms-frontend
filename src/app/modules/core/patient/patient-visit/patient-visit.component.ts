import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../service/api.service';
import { FormUtilService } from '../service/form-util.service';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.scss']
})
export class PatientVisitComponent extends FormBaseController<any> implements OnInit {

  constructor(private formConfig: FormUtilService, public dialog: MatDialog, private apiCommonService: ApiService) {
    super(formConfig.patientVisitForm, '');
  }
  role: any;
  editable: boolean = true;
  links = [
    {
      label: 'Patient Details',
      route: 'patient-details'
    },
    {
      label: 'Vital Signs',
      route: 'vital-signs'
    },
    {
      label: 'Diagnosis',
      route: 'diagnosis'
    },
    {
      label: 'Procedures',
      route: 'procedures'
    },
    {
      label: 'Medications',
      route: 'medications'
    }
  ];
  activeLink = this.links[0].label;

  editButtonClick() {
    this.editable = false;

  }
  saveButtonClick() {

  }
  ngOnInit(): void {
    let url = window.location.href;
    let currentlink = this.links.filter(
      link => link.route === url.substring(url.lastIndexOf('/') + 1)
    );
    this.activeLink = currentlink[0].label
    console.log(sessionStorage)
    this.role = sessionStorage.getItem('roleId') != null ? sessionStorage.getItem('roleId')?.toString() : '0';
    console.log(this.role)

  }
}


