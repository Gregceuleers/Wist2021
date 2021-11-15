import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Player} from "../models/player";
import {IDBPDatabase, openDB} from "idb";
import {WistDBSchema} from "./wist-dbschema";
import {playersDB} from "../models/player";


@Injectable({
  providedIn: 'root'
})
export class IdbService {

  private _playersSubject: Subject<Player[]> = new Subject<Player[]>();
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
        }

      }
    );

    await this.initData();

    return new Promise(() => {});


  }

  private async initData(): Promise<void> {
    playersDB.forEach(playersDB => {
      this._dbPromise?.put("players", playersDB);
    })
    this._playersSubject.next(playersDB);

  }

  dataPlayers(): Observable<Player[]> {
    return this._playersSubject.asObservable();
  }


}
