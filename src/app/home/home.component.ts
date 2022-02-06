import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../db/services/player.service";
import {Player} from "../db/models/player";
import {GameService} from "../db/services/game.service";
import {Game, GameState} from "../db/models/game";
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
  gameStatusChecked = GameState.EN_COURS;
  latestPlayedGame: Game | undefined;
  latestPlayedGameData: any;
  latestPlayedGameOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: false,
          boxWidth: 5
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
      if (games.length > 0) {
        // @ts-ignore
        this.playedGames = games.sort((a, b) => b.created - a.created).slice();
        this.latestPlayedGame = this.playedGames[0];
        this.gameStatusChecked = this.latestPlayedGame.state ? this.latestPlayedGame.state : GameState.CREATION;
        this.latestPlayedGameData = this.statisticsService.generateChartDataLatestGame(this.latestPlayedGame);
      }
      console.log(this.playedGames);
    })
  }

  displayGameState(currentState: GameState): string {
    switch (currentState) {
      case GameState.CREATION:
        this.gameStatusChecked = GameState.CREATION;
        return 'EN CRÉATION'
      case GameState.TERMINEE:
        this.gameStatusChecked = GameState.TERMINEE;
        return 'TERMINÉE';
      case GameState.EN_COURS:
        this.gameStatusChecked = GameState.EN_COURS;
        return 'EN COURS ...';
    }
  }
}
