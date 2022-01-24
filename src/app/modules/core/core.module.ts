import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorsService } from '../common/services/http-interceptor.service';
import { FooterComponent } from './dashboard/footer/footer.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    RouterModule
  ],
  providers: [

  ]
})
export class CoreModule { }
