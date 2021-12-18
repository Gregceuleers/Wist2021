import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdbService} from "./db/core/idb.service";
import {Subscription} from "rxjs";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Wist2021';

  dataPlayersSubscription: Subscription | undefined;
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
    this.dataPlayersSubscription = this.dbService.dataPlayers().subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
    if (this.dataPlayersSubscription) {
      this.dataPlayersSubscription.unsubscribe();
    }
  }
}
