import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GameService} from "../../db/services/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nombre-parties',
  templateUrl: './nombre-parties.component.html',
  styleUrls: ['./nombre-parties.component.css']
})
export class NombrePartiesComponent implements OnInit {

  form: FormGroup;
  nombreParties: any[] = [
    { name: '12', value:12 },
    { name: '18', value: 18 },
    { name: '24', value: 24 },
    { name: '32', value: 32 },
  ]

  constructor(
    private builder: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.form = this.builder.group({
      nombreParties: [{name: '12', value: 12}]
    })
  }

  ngOnInit(): void {
  }

  checkValidity(): void {

  }

  nextPage(): void {
    const newGame = this.gameService.getNewGame();
    newGame.gameNumbers = this.form.get('nombreParties')?.value.value;
    console.log(newGame);
    this.gameService.setNewGame(newGame);
    this.router.navigate(['/partie/confirmation']).then();
  }

  prevPage(): void {
    this.router.navigate(['/partie/']).then();
  }
}
