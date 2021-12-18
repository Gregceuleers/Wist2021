import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Player} from "../models/player";
import {IDBPDatabase, openDB} from "idb";
import {WistDBSchema} from "./wist-dbschema";
import {playersDB} from "../models/player";
import {Game} from "../models/game";


@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private _dbPromise: IDBPDatabase<WistDBSchema> | undefined;

  constructor() {
  }

  async connectToIDB(): Promise<void> {
    this._dbPromise = await openDB<WistDBSchema>('wist-database', 1, {
        upgrade(db) {

          const playerStore = db.createObjectStore('players', {
            keyPath: 'name',
            autoIncrement: true
          });
          playerStore.createIndex('by-name', 'name');

          const gameStore = db.createObjectStore('games', {
            keyPath: 'id',
            autoIncrement: true
          });
          gameStore.createIndex('by-id', 'id');
        }

      }
    );

    await this.initData();

    return new Promise(() => {
    });


  }

  private async initData(): Promise<void> {
    playersDB.forEach(playersDB => {
      this._dbPromise?.put("players", playersDB);
    })


  }

  iDB(): IDBPDatabase<WistDBSchema> | undefined {
    return this._dbPromise;
  }


}
