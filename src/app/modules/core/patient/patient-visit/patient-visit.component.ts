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
export class PatientVisitComponent extends FormBaseController<any> implements OnInit{

  constructor(private formConfig: FormUtilService, public dialog: MatDialog, private apiCommonService: ApiService) {
    super(formConfig.patientVisitForm, '');
   }

  code: string = "Hello";
  desc: string= "hai";
  editable: boolean = true;
  drugForm:string[] = [
    '1','2','3'
  ]; 
  drugName:string[] = [
    'a','b','c'
  ];
  procDesc:string[] =[
    'x','y','z'
  ];
  diagnosisDesc:string[] = [
    'q','w','e'
  ];
  // dataSource:DetailsInterface[]=[
  //   // {code:'A001', description:'Sample Drug', isDepricated:'yes'}
  // ];
  // dataSource:DetailsInterface[] = 
  // displayedColumns: string[] = ['code', 'description', 'isDepricate'];

  links = [
    // {
    //   label:'Patient Details',
    //   route:'patient-details'
    // },
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

  editButtonClick(){
    this.editable = false;
    // call api for all the dropdowns in the visit screen and set them in
    // corresponding arrays to auto populate
  }
  saveButtonClick(){
    
  }
  ngOnInit(): void {
      // this.loadGrid("3"); // get userId from session and 
    let url = window.location.href;    
    let currentlink = this.links.filter(
      link => link.route === url.substring(url.lastIndexOf('/')+1)
    );
    this.activeLink = currentlink[0].label
  }
}

  // addButtonClick(){
  //   // call api for loading data in proc code and proc description
  //   console.log("in add button click before api call");
  
  //   const dialogRef = this.dialog.open(PatientProcedureModalDialogComponent, {
  //     width: '350px',
  //     data: this.dataSource
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     // this.dataSource.push({
  //     //   code:result["code"],
  //     //   description:result["description"],
  //     //   isDepricated:result["isDepricated"]
  //     // });
  //     // this.dataSource = [...this.dataSource];
  //     // this.dialog
  //     if(result && result['code'] && result['description']&& result['isDepricated']){
  //     const param : any = {
  //       result: [{
  //       code:result["code"],
  //       description:result["description"],
  //       isDepricated:result["isDepricated"]
  //       }]
  //     }
  //     this.saveProcDetails(param);
  //   }
  //     // this.loadGrid("3");
  //   });
  // }
  // // updateLinkClick(pojo:any){
  // //   console.log("update clicked " + JSON.stringify(pojo));
  // //   this.addButtonClick(pojo);
  // // }
  
  // /**
  //  * @param  {string} userId
  //  * @description used for obtaining the procedure details for
  //  * particular logged in patient.
  //  */
  // loadGrid(userId : string){
  //   const param : any = {
  //     patientId: userId
  //   }
  //   this.apiCommonService.getProcDetailsForPatient(param).subscribe(
  //     res => {
  //       // console.log("*************In add button click"+JSON.stringify(res));
  //       this.dataSource = res['result'];
  //       // console.log(this.dataSource);
  //     }
  //   );
  // }

  // saveProcDetails(param:any){
  //   // console.log("save procedure details called")
  //   this.apiCommonService.saveProcDetailsForPatient(param).subscribe(
  //     res => {
  //       // console.log("saved")
  //       this.loadGrid(param.userId);
  //     }
  //   );
  // }
// }

// export interface ProcedureInterface {
//   code:string;
//   description:string;
//   isDepricated:string;
// }

// @Component({
//   selector: 'patient-modal-dialog',
//   templateUrl: 'patient-modal-dialog.html',
// })
// export class PatientModalDialog extends FormBaseController<any>{
//   constructor (private formConfig:PatientFormUtilService,
//     public dialogRef: MatDialogRef<PatientModalDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: ProcedureInterface
//   ) {
//     super(formConfig.patientModalDialog, '');
//   }
//   procDesc:string[] =[
//     'x','y','z'
//   ];
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
