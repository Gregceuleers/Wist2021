import {Component, OnInit} from '@angular/core';
import {GameService} from "../../db/services/game.service";
import {Game, GameState} from "../../db/models/game";
import {Player} from "../../db/models/player";
import {PlayerFrameResult} from "../../db/models/player-frame-result";
import {Frame} from "../../db/models/frame";
import {Router} from "@angular/router";
import {EndResultPlayer} from "../../db/models/end-result-player";

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
  resultEndGamePlayers: EndResultPlayer[] = [];

  constructor(
    private gameService: GameService,
    private router: Router
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
    // if (this.currentGame?.currentFrame && this.currentGame.framesNumber && this.currentGame.id) {
    //   if (this.currentGame.currentFrame > this.currentGame.framesNumber) {
    //     this.gameService.addFrameToGame(frame, this.currentGame.id).subscribe(game => {
    //       this.currentGame = game;
    //       this.endGame = true;
    //       this.showGame = false;
    //       this.gameService.updateEndCurrentGame(this.currentGame, this.currentGame.id).subscribe(result => {
    //         if (result) {
    //
    //         }
    //       })
    //       console.log(this.currentGame);
    //     })
    //
    //   }
    // } else {
    if (this.currentGame?.id) {
      this.currentGame.currentFrame++;
      if (this.currentGame.currentFrame > this.currentGame.framesNumber) {
        this.generateDataEndGame();
        this.endGame = true;
      }
      // console.log(frame);
      this.gameService.addFrameToGame(frame, this.currentGame.id).subscribe(game => {
        this.currentGame = game;

        this.showGame = true;
        this.players = this.currentGame.frames[this.currentGame.currentFrame - 2].framePlayerResultList
          // .sort((a, b) => b.score - a.score);
        console.log(this.currentGame);
      })
    }
    // }


  }


  collectOutputData(data: Frame): void {
    console.log(data);
    data.framePlayerResultList = this.players;
    this.nextFrame(data);
  }

  collectSendEndData($event: boolean): void {
    if ($event) {
      if (this.currentGame?.state) {
        this.currentGame.state = GameState.TERMINEE;
        this.gameService.updateEndPlayersPointsGame(this.resultEndGamePlayers, this.currentGame?.id).subscribe(done => {
          if (done) {
            this.gameService.updateEndCurrentGame(this.currentGame, this.currentGame?.id).subscribe(result => {
              if (result) {
                this.router.navigate(['']).then();
              }
            })
          }
        })


      }
    }

  }

  private generateDataEndGame(): void {
    let endGameScore = 5;
    this.currentGame?.frames[this.currentGame?.frames.length - 1].framePlayerResultList
      .sort((a, b) => b.score - a.score)
      .forEach(result => {
        // console.log(result.player.name + ' CALCUL SCORE en cours ...' );
        this.resultEndGamePlayers.push({
          score: endGameScore > 0 ? endGameScore : 0 ,
          player: result.player
        });
        endGameScore -= 2;
      });
    this.resultEndGamePlayers = this.resultEndGamePlayers.slice();
    console.log(this.resultEndGamePlayers);
  }
}
