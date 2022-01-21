import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../db/services/player.service";
import {Player} from "../db/models/player";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  today = Date.now();
  players: Player[] = [];

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe(result => {
      this.players = result.sort((a, b) => b.totalPoints - a.totalPoints);
      console.log(this.players);
    })
  }

}
