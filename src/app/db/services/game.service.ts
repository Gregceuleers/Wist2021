import {Injectable} from '@angular/core';
import {IdbService} from "../core/idb.service";
import {Game, GameState} from "../models/game";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Frame} from "../models/frame";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  newGame$: Subject<Game> = new Subject<Game>();
  currentGame$: Subject<Game> = new Subject<Game>();

  private _newGame: Game = {
    players: [],
    gameNumbers: 0,
    frames: []
  }

  constructor(
    private iDBService: IdbService,
    private router: Router,
  ) {
  }

  getNewGame(): Game {
    return this._newGame;
  }

  setNewGame(game: Game): void {
    this._newGame = game;
  }

  addGame(): void {
    this._newGame.state = GameState.EN_COURS;
    this.iDBService.iDB()?.put('games', this._newGame);
    this.newGame$.next(this._newGame);
    this.currentGame$.next(this._newGame);
    // Reset
    this._newGame = {
      players: [],
      gameNumbers: 0,
      frames: [] as Frame[]
    } as Game;

    this.router.navigate(['/']).then();
  }

  // getCurrentGame(): void {
  //    this.iDBService.iDB()?.getAllFromIndex('games', 'by-id').then(result => {
  //     result.forEach(game => {
  //       if (game.state === GameState.EN_COURS) {
  //         this.currentGame$.next(game);
  //         console.log(game);
  //       }
  //     })
  //   });
  // }
}
