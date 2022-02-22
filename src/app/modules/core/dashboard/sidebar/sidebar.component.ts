import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/modules/default/service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus: any[] = []
  constructor(private apiService: ApiService) { }
  firstName:any="" 
  lastName:any="" 
  ngOnInit(): void {
    this.getMenus();
  }
  getMenus() {
    this.firstName=(sessionStorage.getItem('firstName')?.toString())
    this.lastName=(sessionStorage.getItem('lastName')?.toString())
    let roleId=Number(sessionStorage.getItem('roleId')?.toString())
     const param = {
      roleId:roleId
    }
    this.apiService.getMenus(param).subscribe(
      (res: any) => {
        // console.log(res)
        this.menus=res['result']
    })
  }

  // getUserDetails(){
  //   let Id = parseInt( JSON.parse(JSON.stringify(sessionStorage.getItem('userId'))));

  // }
}
