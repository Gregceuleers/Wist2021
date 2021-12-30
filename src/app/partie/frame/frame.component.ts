import {Component, Input, OnInit} from '@angular/core';
import {Frame} from "../../db/models/frame";
import {Player} from "../../db/models/player";
import {GameService} from "../../db/services/game.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {typesManche} from "../../db/services/config";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  @Input() frames: Frame[] = [];
  @Input() players: Player[] = [];
  @Input() dealer: Player | undefined;

  index: number = 1;
  form: FormGroup | undefined;
  typesGame = typesManche;

  constructor(
    private gameService: GameService,
    private builder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      typeGame: ['', Validators.required],
      players: ['', Validators.required]
    })
    this.gameService.getCurrentGame().subscribe(current => {
      if (current != null) {
        this.index = current.currentFrame;
      }
    })
  }

  checkValidity(): void {

  }
}
