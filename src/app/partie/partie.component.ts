import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css'],
})
export class PartieComponent implements OnInit {

  steps: MenuItem[] = [
    {label: 'Joueurs', routerLink: 'selectJoueurs'},
    {label: 'Nombre de parties', routerLink: 'nombreParties'},
    {label: 'Confirmation', routerLink: 'confirmation'}
  ];

  constructor(
    ) { }

  ngOnInit(): void {

  }

}
