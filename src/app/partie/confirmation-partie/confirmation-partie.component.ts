import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../../db/services/game.service";
import {Game} from "../../db/models/game";

@Component({
  selector: 'app-confirmation-partie',
  templateUrl: './confirmation-partie.component.html',
  styleUrls: ['./confirmation-partie.component.css']
})
export class ConfirmationPartieComponent implements OnInit {

  newGameResume: Game;

  constructor(
    private router: Router,
    private gameService: GameService
  ) {
    this.newGameResume = this.gameService.getNewGame();
  }

  ngOnInit(): void {
  }

  prevPage(): void {
    this.router.navigate(['/partie/nombreParties']).then();
  }

  complete(): void {
    this.gameService.addGame();
  }
}
