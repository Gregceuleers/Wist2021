import {Component, OnInit} from '@angular/core';
import {GameService} from "../../db/services/game.service";
import {Game} from "../../db/models/game";
import {Player} from "../../db/models/player";

@Component({
  selector: 'app-partie-en-cours',
  templateUrl: './partie-en-cours.component.html',
  styleUrls: ['./partie-en-cours.component.css']
})
export class PartieEnCoursComponent implements OnInit {

  currentGame: Game | undefined;
  dealer: Player | undefined;

  constructor(
    private gameService: GameService
  ) {
  }

  ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe(result => {
      this.currentGame = result;

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
          console.log(this.currentGame);
        })
      });

    }


  }

  setDealer($event: any): void {
    this.dealer = $event.value;
  }
}
