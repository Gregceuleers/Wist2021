import {Injectable} from '@angular/core';
import {IdbService} from "../core/idb.service";
import {Game} from "../models/game";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  newGame$: Subject<Game> = new Subject<Game>();

  private _newGame: Game = {
    players: [],
    gameNumbers: 0
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
    this.iDBService.iDB()?.put('games', this._newGame);
    this.newGame$.next(this._newGame);
    // Reset
    this._newGame = {
      players: [],
      gameNumbers: 0
    } as Game;

    this.router.navigate(['/partie']).then();
  }
}
