import { Injectable } from '@angular/core';
import {Game} from "../db/models/game";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  countAllPlayedFrames(games: Game[]): number {
    let output = 0;
    games.forEach(game => {
        output+= game.frames.length;
   })
    return output;
  }

  countAllSuccessOrDefeatFrames(games: Game[], isSuccess: boolean): number {
    let output = 0;
    games.forEach(game => {
      game.frames.forEach(f => {

       if (f.success) {
         if (isSuccess) {
           output++;
         }
       } else {
         if (!isSuccess) {
           output++;
         }
       }
      })
    })
    return output;
  }
}
