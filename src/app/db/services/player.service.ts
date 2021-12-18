import { Injectable } from '@angular/core';
import {IdbService} from "../core/idb.service";
import {Player} from "../models/player";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private iDBService: IdbService
  ) { }

  getAllPlayers(): Promise<Player[]> | undefined {
    return this.iDBService.iDB()?.getAllFromIndex('players', 'by-name');
  }
}
