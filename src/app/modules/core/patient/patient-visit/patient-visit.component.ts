import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../service/api.service';
import { FormUtilService } from '../service/form-util.service';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.scss']
})
export class PatientVisitComponent extends FormBaseController<any> implements OnInit {

  constructor(private formConfig: FormUtilService, public dialog: MatDialog, private route: ActivatedRoute) {
    super(formConfig.patientVisitForm, '');
  }


  editable: boolean = true;
  action=""
  id=0;


  links = [
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
    // call api for all the dropdowns in the visit screen and set them in
    // corresponding arrays to auto populate
  }
  saveButtonClick() {

  }
  ngOnInit(): void {
    // this.loadGrid("3"); // get userId from session and 
    let url = window.location.href;
    let currentlink = this.links.filter(
      link => link.route === url.substring(url.lastIndexOf('') + 1)
    );
  //  this.activeLink = currentlink[0].label

    if (this.route.snapshot.params["id"] != undefined) {
      let id: any = this.route.snapshot.params["id"]
      let action: any = this.route.snapshot.params["action"]
      this.id=id;
      this.action=action;
      console.log(id + "Fetched")
      console.log(action + "Fetched")
    }

  }
}

