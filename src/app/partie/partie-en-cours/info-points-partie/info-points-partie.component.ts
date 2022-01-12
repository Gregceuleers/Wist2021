import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-points-partie',
  templateUrl: './info-points-partie.component.html',
  styleUrls: ['./info-points-partie.component.css']
})
export class InfoPointsPartieComponent implements OnInit {

  @Input() data: any | null;

  constructor() { }

  ngOnInit(): void {
  }


}
