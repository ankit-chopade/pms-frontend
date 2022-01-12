import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../default/service/api.service';

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
    let roleId=sessionStorage.getItem('roleId')
    console.log(roleId)
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
