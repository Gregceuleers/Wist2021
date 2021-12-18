import { Injectable } from '@angular/core';
import {IdbService} from "../core/idb.service";
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _newGame: Game = {
    players: [],
    gameNumbers: 0
  }

  constructor(
    private iDBService: IdbService
  ) { }

  getNewGame(): Game {
    return this._newGame;
  }

  setNewGame(game: Game): void {
    this._newGame = game;
  }

  addGame(): void {
    this.iDBService.iDB()?.put('games', this._newGame);
  }
}
