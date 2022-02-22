import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ConfirmPasswordDirective } from './shared/confirm-password.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorsService } from './modules/common/services/http-interceptor.service';







@NgModule({
  declarations: [
    AppComponent,
    ConfirmPasswordDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,

  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-IN' },
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorsService, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
