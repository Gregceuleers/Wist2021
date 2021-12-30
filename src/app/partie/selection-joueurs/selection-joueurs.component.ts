import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Player} from "../../db/models/player";
import {GameService} from "../../db/services/game.service";
import {PlayerService} from "../../db/services/player.service";
import {GameState} from "../../db/models/game";

@Component({
  selector: 'app-selection-joueurs',
  templateUrl: './selection-joueurs.component.html',
  styleUrls: ['./selection-joueurs.component.css']
})
export class SelectionJoueursComponent implements OnInit {

  form: FormGroup;

  validStep = true;
  players: Player[] = [];

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private playerService: PlayerService,
    private gameService: GameService
  ) {
    this.form = this.builder.group({
      players: [],
    })
  }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe(p => this.players = p);
  }

  nextPage(): void {
    this.gameService.setNewGame({
      players: this.form.get('players')?.value,
      state: GameState.CREATION,
      frames: []
    });
    console.log(this.gameService.getNewGame());
    this.router.navigate(['partie/nombreParties']).then();
  }

  checkValidity(): void {
    const selectedPlayers = this.form.get('players')?.value as Player[];
    this.validStep = !(selectedPlayers.length >= 4 && selectedPlayers.length <= 5);
  }
}
