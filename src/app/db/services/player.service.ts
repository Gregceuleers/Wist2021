import {Injectable} from '@angular/core';
import {Player} from "../models/player";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseURL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {



  constructor(
    private httpClient: HttpClient
  ) { }

  getAllPlayers(): Observable<Player[]> {
    return this.httpClient.get<Player[]>( BaseURL + 'players');
  }
}
