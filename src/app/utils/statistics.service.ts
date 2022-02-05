import { Injectable } from '@angular/core';
import {Game} from "../db/models/game";
import {Player} from "../db/models/player";

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

  generateChartDataLatestGame(game: Game): { labels: string[], datasets: { label: string, data: number[]}[]} {
    const dataSet = [] as { label: string, data: number[], tension: number, borderColor: string, borderWidth: number}[];
    const label = this.generateLabels(game);
    const localColors = ['#3631d2', '#e031a3', '#cc5422', '#8a3', '#a85897']

    game.players.forEach((p, index) => {
      dataSet.push({
        label: p.name,
        data: this.generatePlayerData(game, p),
        tension: 0.4,
        borderColor: localColors[index],
        borderWidth: 1
      })
    })
    return {
      labels: label,
      datasets: dataSet
    }
  }

  private generateLabels(game: Game): string[] {
    let output = [] as string[];
    for (let i = 1; i <= game.framesNumber; i++) {
      output.push(i.toFixed());
    }
    return output;
  }

  private generatePlayerData(game: Game, p: Player): number[] {
    let output = [] as number[];

    game.frames.forEach(frame => {
      frame.framePlayerResultList.forEach(result => {
        if (result.player.name === p.name) {
          output.push(result.score);
        }
      })
    })
    return output;
  }
}
