import {Component, OnInit} from '@angular/core';
import {GameService} from "../../db/services/game.service";
import {Game, GameState} from "../../db/models/game";
import {Player} from "../../db/models/player";
import {PlayerFrameResult} from "../../db/models/player-frame-result";
import {Frame} from "../../db/models/frame";

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
  endGame = false;

  constructor(
    private gameService: GameService
  ) {
  }

  private generatePlayersDataInit(players: Player[]) {
    players.forEach(p => {
      this.players.push({
        player: p,
        score: 0
      })
    });

  }

  ngOnInit(): void {
    this.gameService.getCurrentGame().subscribe(result => {
      // console.log(result);
      this.currentGame = result;
      if (this.currentGame !== null) {
        this.showGame = true;
        if (this.currentGame.currentFrame <= 1) {
          this.generatePlayersDataInit(this.currentGame.players);
        } else {
          console.log(this.currentGame);
          this.players = this.currentGame.frames[this.currentGame.currentFrame - 2].framePlayerResultList
            .sort((a, b) => b.score - a.score);
        }
      }

    })
  }

  nextFrame(frame: Frame): void {
    if (this.currentGame?.id) {
      this.currentGame.currentFrame++;
     // console.log(frame);
      this.gameService.addFrameToGame(frame,this.currentGame.id).subscribe(game => {
        this.currentGame = game;
        if (this.currentGame.currentFrame > this.currentGame.framesNumber) {
          this.endGame = true;
        }
        this.showGame = true;
        this.players = this.currentGame.frames[this.currentGame.currentFrame - 2].framePlayerResultList
          .sort((a, b) => b.score - a.score);
         console.log(this.currentGame);
      })
    }
  }

  private saveEndGameToDB(game: Game | undefined): void {

  }

  collectOutputData(data: Frame): void {
    console.log(data);
    data.framePlayerResultList = this.players;
    this.nextFrame(data);
  }

  collectEndGame(data: boolean): void {
    if (this.currentGame?.state) {
      this.currentGame.state = GameState.TERMINEE;
    }
   this.saveEndGameToDB(this.currentGame);
  }
}
