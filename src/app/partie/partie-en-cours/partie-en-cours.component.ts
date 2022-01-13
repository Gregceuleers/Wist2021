import {Component, OnInit} from '@angular/core';
import {GameService} from "../../db/services/game.service";
import {Game} from "../../db/models/game";
import {Player} from "../../db/models/player";
import {PlayerFrameResult} from "../../db/models/player-frame-result";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-partie-en-cours',
  templateUrl: './partie-en-cours.component.html',
  styleUrls: ['./partie-en-cours.component.css']
})
export class PartieEnCoursComponent implements OnInit {

  currentGame: Game | undefined;
  dealer: Player | undefined;
  showGame = false;
  players: PlayerFrameResult[] = [];

  constructor(
    private gameService: GameService
  ) {
  }

  private generatePlayersDataInit(players: Player[]): PlayerFrameResult[] {
    players.forEach(p => {
      this.players.push({
        player: p,
        result: 0
      })
    });

    return this.players;
  }

  ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe(result => {
      this.currentGame = result;
      if (this.currentGame !== null && this.currentGame.currentFrame > 0) {
        this.showGame = true;
        this.players = this.generatePlayersDataInit(this.currentGame.players);
      }

    })
  }

  launchFrame(): void {

    if (this.currentGame) {
      this.currentGame.currentFrame++;
      this.gameService.updateCurrentGame(this.currentGame).subscribe(result => {
        this.currentGame = result;
        this.gameService.addFrameToGame({
          dealer: this.dealer ? this.dealer.name : '',
          gameId: this.currentGame.id ? this.currentGame.id : 0,
          playerResults: []

        }, this.currentGame.id ? this.currentGame.id : 0).subscribe(game => {
          this.currentGame = game;
          this.showGame = true;
          console.log(this.currentGame);
        })
      });

    }
  }

  nextFrame(): void {
    if (this.currentGame?.currentFrame) {
      this.currentGame.currentFrame++;
    }
  }

  setDealer($event: any): void {
    this.dealer = $event.value;
  }
}
