import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {GameService} from "../db/services/game.service";

@Component({
  selector: 'app-partie',
  templateUrl: './partie.component.html',
  styleUrls: ['./partie.component.css'],
  providers: [MessageService]
})
export class PartieComponent implements OnInit, OnDestroy {

  newGameCreated: Subscription | undefined;

  steps: MenuItem[] = [
    {label: 'Joueurs', routerLink: 'selectJoueurs'},
    {label: 'Nombre de parties', routerLink: 'nombreParties'},
    {label: 'Confirmation', routerLink: 'confirmation'}
  ];

  constructor(
    private messageService: MessageService,
    private gameService: GameService
    ) {
  }

  ngOnDestroy(): void {
        if (this.newGameCreated) {
          this.newGameCreated.unsubscribe();
        }
    }

  ngOnInit(): void {
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

}
