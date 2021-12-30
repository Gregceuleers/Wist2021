import {Component, Input, OnInit} from '@angular/core';
import {Frame} from "../../../db/models/frame";

@Component({
  selector: 'app-totaux-partie',
  templateUrl: './totaux-partie.component.html',
  styleUrls: ['./totaux-partie.component.css']
})
export class TotauxPartieComponent implements OnInit {

  constructor() { }

  @Input() frames: Frame[] | undefined;

  ngOnInit(): void {
  }

}
