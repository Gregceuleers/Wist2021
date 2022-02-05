import {Component, OnInit} from '@angular/core';
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

  // LASTEST GAME INFO GRAPHS
  latestPlayedGame: Game | undefined;
  latestPlayedGameData: any;
  latestPlayedGameOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: false,
          boxWidth: 10
        }
      }
    },
    elements: {
      point: {
        radius: 1
      }
    }
  };

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    public statisticsService: StatisticsService
  ) {
  }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe(result => {
      this.players = result.sort((a, b) => b.totalPoints - a.totalPoints);
    });
    this.gameService.getAllGames_Statistics().subscribe(games => {
      this.playedGames = games;
      if (games.length > 0) {
        this.latestPlayedGame = games[games.length - 1];
        this.latestPlayedGameData = this.statisticsService.generateChartDataLatestGame(this.latestPlayedGame);
      }
      console.log(this.playedGames);
    })
  }

}
