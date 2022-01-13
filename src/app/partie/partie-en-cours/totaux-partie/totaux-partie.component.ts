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

  ngOnInit(): void {
  }

}
