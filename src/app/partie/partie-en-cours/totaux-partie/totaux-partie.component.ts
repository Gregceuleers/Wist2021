import {Component, Input, OnInit} from '@angular/core';
import {Frame} from "../../../db/models/frame";
import {PlayerFrameResult} from "../../../db/models/player-frame-result";

@Component({
  selector: 'app-totaux-partie',
  templateUrl: './totaux-partie.component.html',
  styleUrls: ['./totaux-partie.component.css']
})
export class TotauxPartieComponent implements OnInit {

  constructor() { }

  @Input() frames: Frame[] = [];
  @Input() players: PlayerFrameResult[] = [];
  showGameDataDialog = false;

  ngOnInit(): void {

  }

  checkIfDataValid(): boolean {
    if (this.players && this.players.length > 0) {
      let total = 0;
      this.players.forEach(p => {
        total += p.score;
      })
      return total === 0;
    }
    return false;
  }

  openGameDataDialog(): void {
    this.showGameDataDialog = true;
  }

  close(): void {
    this.showGameDataDialog = false;
  }
}
