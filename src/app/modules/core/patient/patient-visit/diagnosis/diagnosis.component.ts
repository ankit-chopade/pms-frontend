import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { NotificationService } from 'src/app/modules/default/service/notification.service';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { DetailsInterface } from '../patient-modal/DetailsInterface';
import { DiagnosisModalDialogComponent } from './diagnosis-modal-dialog/diagnosis-modal-dialog.component';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss'],
})
export class DiagnosisComponent
  extends FormBaseController<any>
  implements OnInit {
  appointmentId: number  //Static Value
  isEdit: boolean = true
  action: string;

  constructor(
    private formConfig: FormUtilService,
    public dialog: MatDialog,
    private apiCommonService: ApiService,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    super(formConfig.diagnosisDetailsForm, '');
  }
  data: any[] = []
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    'code',
    'description',
    'isDepricate',
    'prescribedDate',
    'delete'
  ];
  ngOnInit(): void {
   
    //console.log(this.route.snapshot.params["id"])
    if (this.route.snapshot.params["id"] != undefined) {
      this.appointmentId = this.route.snapshot.params["id"]
      this.action = this.route.snapshot.params["action"]
      if (this.action == "view")
        this.isEdit = false;
      else
        this.isEdit = true;
    }
    this.loadGrid();
  }

  diagnosisAddButtonClick() {
    const dialogRef = this.dialog.open(DiagnosisModalDialogComponent, {
      // width: '250px',
      data: this.data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (
        result &&
        result['code'] &&
        result['description'] 
        
      ) 
      {
        if (this.validateExistingDiagnosis(result['selectedId']) || result['description'] == 'Others') {
          const param: any = {
            diagnosisId: result['selectedId'],
            appointmentId: this.appointmentId, //Passing Static Value
            diagnosisCode: result['code'],
            diagnosisDescription: result['description'],
            diagnosisIsDepricated: result['isDepricated'],
            diagnosisDetails: result['details'] == undefined ? null : result['details']
          };
          this.saveDiagnosisDetails(param);
        } else {
          this.notifyService.showError('Diagnosis Already Exists', 'Error');
        }
      }
    });
  }

  validateExistingDiagnosis(selectedId: number): boolean {
    let data: any = this.data.find(d => d.diagnosisId == selectedId && d.appointmentId == this.appointmentId)
    if (data == null) {
      return true;
    }
    return false;
  }

  loadGrid() {
    const param: any = {
      id: this.appointmentId
    };
    this.apiCommonService.getDiagnosisDetailsForPatient(param).subscribe(
      (res) => {
        this.data = res['result'];
        this.data.forEach((element) => {
          element.diagnosisIsDepricated = element.diagnosisIsDepricated == 0 ? 'Yes' : 'No';
          let customDate = element.createdDate.split(' ')[0].split('-');
          element.prescribedDate = customDate[2] + '-' + customDate[1] + '-' + customDate[0];
          element.deleteButton = (element.appointmentId == this.appointmentId) ? "delete" : ""

        });
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;

      });
  }

  deleteDiagnosisClick(patientDiagnosisId: number) {
    const param: any = {
      patientDiagnosisId: patientDiagnosisId
    }
    this.apiCommonService.deleteDiagnosisDetail(param).subscribe((res) => {
      if (res && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess("Diagnosis deleted successfully", "Success");
      } else {
        this.notifyService.showError("Diagnosis deletion failed", "Error");
      }
    })
  }

  saveDiagnosisDetails(param: any) {
    this.apiCommonService.saveDiagnosisDetails(param).subscribe((res) => {
      if (res && res['result'] && res['status'] === 200) {
        this.loadGrid();
        this.notifyService.showSuccess("Diagnosis added successfully", "Success");
      } else {
        this.notifyService.showSuccess("Diagnosis addition failed", "Error");
      }
    });
  }
  nextButtonClick() {
    this.router.navigate(['../dashboard/patient/procedures/',this.action, this.appointmentId], {
      skipLocationChange: true
    });
  }
  previousButtonClick() {
    this.router.navigate(['../dashboard/patient/vital-signs/',this.action, this.appointmentId], {
      skipLocationChange: true
    });
  }
}
