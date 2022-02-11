import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBaseController } from 'src/app/modules/common/utility/form-base-controller';
import { ApiService } from '../../service/api.service';
import { FormUtilService } from '../../service/form-util.service';
import { DetailsInterface } from '../patient-modal/DetailsInterface';
import { PatientProcedureModalDialogComponent } from './patient-procedure-modal-dialog/patient-procedure-modal-dialog.component';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent extends FormBaseController<any> implements OnInit {

  appointmentId: number = 24 //Static Value

  dataSource: any[] = [
    // {code:'A001', description:'Sample Drug', isDepricated:'yes'}
  ];
  // dataSource:DetailsInterface[] = 
  displayedColumns: string[] = ['code', 'description', 'isDepricate'];

  constructor(private formConfig: FormUtilService, public dialog: MatDialog, private apiCommonService: ApiService) {
    super(formConfig.procedureDetailsForm, '');
  }

  ngOnInit(): void {
    this.loadGrid("3");
  }

  addButtonClick() {
    // call api for loading data in proc code and proc description
    console.log("in add button click before api call");

    const dialogRef = this.dialog.open(PatientProcedureModalDialogComponent, {
      width: '350px',
      data: this.dataSource
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.dataSource.push({
      //   code:result["code"],
      //   description:result["description"],
      //   isDepricated:result["isDepricated"]
      // });
      // this.dataSource = [...this.dataSource];
      // this.dialog
      if (result && result['code'] && result['description'] && result['isDepricated']) {
        const param: any = {

          procedureId: result['selectedId'],
          appointmentId: this.appointmentId,
          code: result["code"],
          description: result["description"],
          isDepricated: result["isDepricated"]

        }
        this.saveProcDetails(param);
      }
      // this.loadGrid("3");
    });
  }

  loadGrid(userId: string) {
    const param: any = {
      appointmentId: this.appointmentId
    }
    this.apiCommonService.getProcDetailsForPatient(param).subscribe(
      res => {
        // console.log("*************In add button click"+JSON.stringify(res));
        this.dataSource = res['result'];
        this.dataSource.forEach(p=>{
          p.procedureIsDepricated= p.procedureIsDepricated==0?"Yes":"No"
        })
        // console.log(this.dataSource);
      }
    );
  }

  saveProcDetails(param: any) {
    // console.log("save procedure details called")
    this.apiCommonService.saveProcDetailsForPatient(param).subscribe(
      res => {
        if (res && res['result'] && res['status'] === 200) {
          this.loadGrid(param.userId);
        } else {

        }
      }
    );
  }
}
