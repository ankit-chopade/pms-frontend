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

  ngOnInit(): void {
    this.getMenus();
  }
  getMenus() {
   
    let roleId=Number(sessionStorage.getItem('roleId')?.toString())
    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', 'Content-Type')
        .set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
        .set('Authorization', `${sessionStorage.getItem('token')}`)
    }
     const param = {
      roleId:roleId
    }
    this.apiService.getMenus(param).subscribe(
      (res: any) => {
        console.log(res)
        this.menus=res['result']
    })
  }
}
