import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {PartieComponent} from "../partie/partie.component";
import {SelectionJoueursComponent} from "../partie/selection-joueurs/selection-joueurs.component";
import {NombrePartiesComponent} from "../partie/nombre-parties/nombre-parties.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'partie',
    component: PartieComponent,
    children: [
      {
        path: '',
        component: SelectionJoueursComponent
      },
      {
        path: 'nombreParties',
        component: NombrePartiesComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
