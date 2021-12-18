import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule} from './app-routing/app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PrimeConfigModule} from './prime/prime-config/prime-config.module';
import {PartieComponent} from './partie/partie.component';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimeConfigModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: MessageService,
      multi: false,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
