import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../db/models/game";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IdbService} from "../../db/core/idb.service";
import {Player} from "../../db/models/player";

@Component({
  selector: 'app-selection-joueurs',
  templateUrl: './selection-joueurs.component.html',
  styleUrls: ['./selection-joueurs.component.css']
})
export class SelectionJoueursComponent implements OnInit {

  newGame: Game | undefined;
  form: FormGroup;

  validStep = true;
  firstname: FormControl = new FormControl('');
  players: Player[] = [];
  selectedPlayers: Player[] = [];

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private iDBService: IdbService
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
    this.router.navigate(['partie/nombreParties']).then();
  }

  checkValidity(): void {
    const selectedPlayers = this.form.get('players')?.value as Player[];
    this.validStep = !(selectedPlayers.length >= 4 && this.selectedPlayers.length <= 5);
  }
}
