import {Component, OnInit} from '@angular/core';
import {IdbService} from "./db/core/idb.service";
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Wist2021';

  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-fw pi-home',
      routerLink: '/'
    },
    {
      label: 'Parties',
      icon: 'pi pi-fw pi-heart',
      items: [
        {
          label: 'Nouvelle Partie',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/partie'
        },
        {
          label: 'Tableau',
          icon: 'pi pi-fw pi-table'
        }
      ]
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {label: 'Delete', icon: 'pi pi-fw pi-trash'},
        {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      ]
    }

  ];

  constructor(
    private dbService: IdbService
  ) {

  }

  ngOnInit(): void {
    this.dbService.connectToIDB().then();
  }

}
