import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdbService} from "./db/core/idb.service";
import {MenuItem, MessageService} from 'primeng/api';
import {Subscription} from "rxjs";
import {GameService} from "./db/services/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Wist2021';

  items: MenuItem[] = [
    {
      label: 'Accueil',
      icon: 'pi pi-fw pi-home',
      routerLink: '/'
    },
    {
      label: 'Jeu',
      icon: 'pi pi-fw pi-heart',
      items: [
        {
          label: 'Nouveau Jeu',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/partie'
        },
        {
          label: 'Partie en cours',
          icon: 'pi pi-fw pi-play',
          routerLink: '/encours',
          disabled: true
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

  newGameCreated: Subscription | undefined;
  currentGame: Subscription | undefined;

  constructor(
    private dbService: IdbService,
    private messageService: MessageService,
    private gameService: GameService
  ) {

  }

  ngOnInit(): void {
    this.dbService.connectToIDB().then();

    this.currentGame = this.gameService.currentGame$.subscribe(g => {
      console.log(g);
    })


    this.newGameCreated = this.gameService.newGame$.subscribe(g => {
      console.log(g);
      this.messageService.add({
        key: 'message',
        severity: 'success',
        summary: 'Nouvelle partie créée',
        detail: '',
        data: g
      })
    })


  }

  ngOnDestroy(): void {
    if (this.newGameCreated) {
      this.newGameCreated.unsubscribe();
    }
    if (this.currentGame) {
      this.currentGame.unsubscribe();
    }
  }

}
