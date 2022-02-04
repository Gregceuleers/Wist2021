import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../db/services/player.service";
import {Player} from "../db/models/player";
import {GameService} from "../db/services/game.service";
import {Game} from "../db/models/game";
import {StatisticsService} from "../utils/statistics.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [StatisticsService]
})
export class HomeComponent implements OnInit {

  today = Date.now();
  players: Player[] = [];
  playedGames: Game[] = [];

  // STATISTICS
  countAllPlayedFrames = 0;

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    public statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe(result => {
      this.players = result.sort((a, b) => b.totalPoints - a.totalPoints);
      // console.log(this.players);
    });
    this.gameService.getAllGames_Statistics().subscribe(games => {
      this.playedGames = games;
      console.log(this.playedGames);
    })
  }

}
