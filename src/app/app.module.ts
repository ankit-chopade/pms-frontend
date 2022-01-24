import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './modules/dashboard/header/header.component';
import { SidebarComponent } from './modules/dashboard/sidebar/sidebar.component';
import { FooterComponent } from './modules/dashboard/footer/footer.component';
import { LayoutComponent } from './modules/dashboard/layout/layout.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmPasswordDirective } from './shared/confirm-password.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent,
    ConfirmPasswordDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-IN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
