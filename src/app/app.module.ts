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
import { SelectionJoueursComponent } from './partie/selection-joueurs/selection-joueurs.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { NombrePartiesComponent } from './partie/nombre-parties/nombre-parties.component';
import { ConfirmationPartieComponent } from './partie/confirmation-partie/confirmation-partie.component';
import { PartieEnCoursComponent } from './partie/partie-en-cours/partie-en-cours.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PartieComponent,
    SelectionJoueursComponent,
    NombrePartiesComponent,
    ConfirmationPartieComponent,
    PartieEnCoursComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimeConfigModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
