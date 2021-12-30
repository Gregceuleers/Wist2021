import {Component, Input, OnInit} from '@angular/core';
import {Frame} from "../../../db/models/frame";
import {Player} from "../../../db/models/player";

@Component({
  selector: 'app-totaux-partie',
  templateUrl: './totaux-partie.component.html',
  styleUrls: ['./totaux-partie.component.css']
})
export class TotauxPartieComponent implements OnInit {

  constructor() { }

  @Input() frames: Frame[] = [];
  @Input() players: Player[] | undefined;

  ngOnInit(): void {
  }

}
