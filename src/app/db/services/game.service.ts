import {Injectable} from '@angular/core';
import {Game, GameState} from "../models/game";
import {Observable, Subject} from "rxjs";
import {Frame} from "../models/frame";
import {HttpClient} from "@angular/common/http";
import {BaseURL} from "./config";
import {EndResultPlayer} from "../models/end-result-player";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  newGame$: Subject<Game> = new Subject<Game>();
  currentGame$: Subject<Game> = new Subject<Game>();



  private _newGame: Game = {
    players: [],
    framesNumber: 0,
    frames: [],
    currentFrame: 0
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
    this._newGame.currentFrame = 1
    const inserted = this._newGame;

    this.newGame$.next(this._newGame);
    this.currentGame$.next(this._newGame);
    // Reset
    this._newGame = {
      players: [],
      framesNumber: 0,
      frames: [] as Frame[],
      currentFrame: 0
    } as Game;

    return this.httpClient.post<Boolean>(BaseURL + "games", inserted);

  }

  getCurrentGame(): Observable<Game> {
    return this.httpClient.get<Game>(BaseURL + "games/current");
  }

  updateCurrentGame(game: Game): Observable<Game> {
    return this.httpClient.put<Game>(BaseURL + "games", game)
  }

  addFrameToGame(frame: Frame, gameId: number): Observable<Game> {
    return this.httpClient.put<Game>(BaseURL + "games/" + gameId + "/frames", frame);
  }

  updateEndCurrentGame(game: Game | undefined, gameId: number | undefined): Observable<Boolean> {
    return this.httpClient.put<Boolean>(BaseURL + "games/" + gameId + "/frames/end", game);
  }

  updateEndPlayersPointsGame(results: any[], gameId: number | undefined): Observable<Boolean> {
    return this.httpClient.put<Boolean>(BaseURL + "games/" + gameId + "/players/end", results);
  }

}
