import {Injectable} from '@angular/core';
import {IdbService} from "../core/idb.service";
import {Game, GameState} from "../models/game";
import {Observable, Subject} from "rxjs";
import {Frame} from "../models/frame";
import {HttpClient} from "@angular/common/http";
import {BaseURL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  newGame$: Subject<Game> = new Subject<Game>();
  currentGame$: Subject<Game> = new Subject<Game>();



  private _newGame: Game = {
    players: [],
    framesNumber: 0,
    frames: []
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getNewGame(): Game {
    return this._newGame;
  }

  setNewGame(game: Game): void {
    this._newGame = game;
  }

  addGame(): Observable<Boolean> {
    this._newGame.state = GameState.EN_COURS;
    const inserted = this._newGame;

    this.newGame$.next(this._newGame);
    this.currentGame$.next(this._newGame);
    // Reset
    this._newGame = {
      players: [],
      framesNumber: 0,
      frames: [] as Frame[]
    } as Game;

    return this.httpClient.post<Boolean>(BaseURL + "games", inserted);

  }

  getCurrentGame(): Observable<Game> {
    return this.httpClient.get<Game>(BaseURL + "games/current");
  }


}
