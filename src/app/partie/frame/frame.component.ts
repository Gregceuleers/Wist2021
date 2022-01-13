import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Frame} from "../../db/models/frame";
import {Player} from "../../db/models/player";
import {GameService} from "../../db/services/game.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {typesManche} from "../../db/services/config";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
  providers: [ConfirmationService]
})
export class FrameComponent implements OnInit {

  @Input() frames: Frame[] = [];
  @Input() players: Player[] = [];
  @Input() dealer: Player | undefined;

  @Output() sendOutputData: EventEmitter<any> = new EventEmitter<any>();

  index: number = 1;
  form: FormGroup | undefined;
  typesGame = typesManche;

  constructor(
    private gameService: GameService,
    private confirmationService: ConfirmationService,
    private builder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      dealer: [null, Validators.required],
      typeGame: [null, Validators.required],
      players: [null, Validators.required]
    })
    this.gameService.getCurrentGame().subscribe(current => {
      if (current != null) {
        this.index = current.currentFrame;
      }
    })
  }

  checkValidity(): void {

  }

  getInfoPoints(): any {
    if (this.form?.get('typeGame') && this.form?.get('typeGame')?.value !== undefined) {
      return this.form?.get('typeGame')?.value;
    }
    return null;
  }

  isAlone(): boolean {
    if (this.form?.get('typeGame') && this.form?.get('typeGame')?.value !== undefined) {
      return !this.form?.get('typeGame')?.value?.jeuADeux;
    }
    return true;
  }

  private resetForm(): void {
    this.form?.reset();
    this.form?.updateValueAndValidity();
  }

  private generateConfirmationMessage(form: any, aReussi: boolean): string {
    console.log(form);

    let player, player1, message = '';

    if (this.form?.get('typeGame')?.value.jeuADeux) {
      const players = (this.form?.get('players')?.value as Player[]);
      const verbe = aReussi ? ' ont réussi ' : ' ont raté ';
      player = players !== undefined ? players[0].name : '';
      player1 = players !== undefined ? players[1].name : '';
      message = player + ' et ' + player1 + verbe + this.form?.get('typeGame')?.value.label
    } else {
      const players = (this.form?.get('players')?.value as any);
      const verbe = aReussi ? ' a réussi ' : ' a raté ';
      player = players !== undefined ? players.name : '';
      message = player + verbe + this.form?.get('typeGame')?.value.label

    }
    return message;
  }

  success(event: Event): void {
    console.log();
    // if (this.form?.valid) {
    switch ((event as SubmitEvent)?.submitter?.innerText) {
      case 'Réussite':
        this.confirmationService.confirm({
          message: this.generateConfirmationMessage(this.form?.value, true),
          header: 'Confirmation de réussite',
          icon: 'pi pi-thumbs-up',
          acceptButtonStyleClass: 'p-button-outlined p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-danger',
          acceptLabel: 'Confirmer',
          rejectLabel: 'Refuser',
          accept: () => {
            this.resetForm();
          },
          reject: () => {
          }
        })
        break;
      case 'Echec':
        this.confirmationService.confirm({
          message: this.generateConfirmationMessage(this.form?.value, false),
          header: 'Confirmation de défaite',
          icon: 'pi pi-thumbs-down',
          acceptButtonStyleClass: 'p-button-outlined p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-danger',
          acceptLabel: 'Confirmer',
          rejectLabel: 'Refuser',
          accept: () => {
          },
          reject: () => {
          }
        })
        break;
    }
  }

  // }
}
