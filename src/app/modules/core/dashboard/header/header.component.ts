import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/modules/common/services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  constructor(private router:Router,private logoutService: LogoutService) { }

  ngOnInit(): void {

  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit()
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 300);
  }
  signOut(){
    this.router.navigate(['../'])
    this.logoutService.logOut();
    sessionStorage.clear();
  }

}
