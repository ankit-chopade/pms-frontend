import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-patient-portal-screen',
  templateUrl: './patient-portal-screen.component.html',
  styleUrls: ['./patient-portal-screen.component.scss']
})
export class PatientPortalScreenComponent implements OnInit {

  patients : any[] = [ ];
 
  columnsToDisplay: string[] = ['id','title','first_name','last_name','details'];
  dataSource=this.patients;
 
   constructor(private matDialog:MatDialog ,private router :Router ,private service :ApiService) { }
   
   ngOnInit(): void {
     
     this.service.getAllPatientDeatils().subscribe(
       res=>{        
         if (res['status']==200 && res['result'] && res != null){
 
         
           for (let patient of res['result']) {
             if(patient.roleId == 5){
               this.patients = res['result']
             }
              
         }
            
         }
       }
     );
   }
     
   popup_click(id:any){   
       
     this.router.navigate(['/dashboard/patient/details',id])
     
   }
  }   
