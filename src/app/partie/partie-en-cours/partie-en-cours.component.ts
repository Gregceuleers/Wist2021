import {Component, OnInit} from '@angular/core';
import {GameService} from "../../db/services/game.service";
import {Game} from "../../db/models/game";
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
      console.log(result);
      this.currentGame = result;
      if (this.currentGame !== null) {
        this.showGame = true;
        this.generatePlayersDataInit(this.currentGame.players);
      }

    })
  }

  launchFrame(): void {

    if (this.currentGame) {
      this.currentGame.currentFrame++;
      this.gameService.updateCurrentGame(this.currentGame).subscribe(result => {
        this.currentGame = result;
        this.showGame = true;
        // this.gameService.addFrameToGame({
        //   dealer: this.dealer ? this.dealer.name : '',
        //   gameId: this.currentGame.id ? this.currentGame.id : 0,
        //   playerResults: []
        // }, this.currentGame.id ? this.currentGame.id : 0).subscribe(game => {
        //   this.currentGame = game;
        //   this.showGame = true;
        //   console.log(this.currentGame);
        // })
      });

    }
  }

  nextFrame(frame: Frame): void {
    if (this.currentGame?.id) {
      this.currentGame.currentFrame++;
      this.gameService.addFrameToGame(frame,this.currentGame.id).subscribe(game => {
        this.currentGame = game;
        this.showGame = true;
        this.players = this.currentGame.frames[this.currentGame.currentFrame - 2].framePlayerResultList;
        console.log(this.currentGame);
      })
    }
  }

  collectOutputData(data: Frame): void {
    data.framePlayerResultList = this.players;
    this.nextFrame(data);
  }
}
