import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../db/models/game";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IdbService} from "../../db/core/idb.service";
import {Player} from "../../db/models/player";
import {GameService} from "../../db/services/game.service";

@Component({
  selector: 'app-selection-joueurs',
  templateUrl: './selection-joueurs.component.html',
  styleUrls: ['./selection-joueurs.component.css']
})
export class SelectionJoueursComponent implements OnInit {

  form: FormGroup;

  validStep = true;
  players: Player[] = [];
  selectedPlayers: Player[] = [];

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private iDBService: IdbService,
    private gameService: GameService
  ) {
    this.form = this.builder.group({
      players: [],
    })
  }

  ngOnInit(): void {
    this.iDBService.dataPlayers().subscribe(players => {
      this.players = players;
    })
  }

  nextPage(): void {
    this.gameService.setNewGame({
      players: this.selectedPlayers,
    })
    this.router.navigate(['partie/nombreParties']).then();
  }

  checkValidity(): void {
    const selectedPlayers = this.form.get('players')?.value as Player[];
    this.validStep = !(selectedPlayers.length >= 4 && this.selectedPlayers.length <= 5);
  }
}
