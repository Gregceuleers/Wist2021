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

  @Output() sendOutputData: EventEmitter<Frame> = new EventEmitter<Frame>();

  index: number = 1;
  gameId: number | undefined = 0;
  form: FormGroup | undefined;
  result: string | undefined;
  typesGame = typesManche;
  framePlayers: Player[] = [];
  extraFramePlayers: Player[] = [];
  showExtraInfoDialog = false;
  showExtraPlayersDialog = false;
  messageDialog = '';

  constructor(
    private gameService: GameService,
    private confirmationService: ConfirmationService,
    private builder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.framePlayers = this.players;

    this.form = this.builder.group({
      dealer: [null, Validators.required],
      typeGame: [null, Validators.required],
      players: [null, Validators.required]
    });

    this.gameService.getCurrentGame().subscribe(current => {
      if (current != null) {
        this.index = current.currentFrame;
        this.gameId = current.id;
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

  private generateInactivePlayer(inactivePlayer: Player): string | undefined {
    return (this.players.length === 5) ? inactivePlayer.name : undefined;
  }

  private checkIfOpenExtraPointDialog(isSuccess: boolean, wistGameInfoLabel: string): boolean {
    if (isSuccess) {
      switch (wistGameInfoLabel) {
        case 'Petite misère à 2':
        case 'Grande misère à 2':
        case 'Piccolo à 2':
        case 'Piccolissimo à 2':
          return true;
      }
    } else {
      switch (wistGameInfoLabel) {
        case 'Petite misère à 2':
        case 'Grande misère à 2':
        case 'Piccolo à 2':
        case 'Piccolissimo à 2':
          return  true;
      }
    }

    return false;
  }

  submit(event: Event): void {
    console.log();

    // if (this.form?.valid) {
    switch ((event as SubmitEvent)?.submitter?.innerText) {
      case 'Réussite':
        this.messageDialog = 'Réussite';
        this.confirmationService.confirm({
          message: this.generateConfirmationMessage(this.form?.value, true),
          header: 'Confirmation de réussite',
          icon: 'pi pi-thumbs-up',
          acceptButtonStyleClass: 'p-button-outlined p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-danger',
          acceptLabel: 'Confirmer',
          rejectLabel: 'Refuser',
          accept: () => {
            if (this.checkIfOpenExtraPointDialog(true, this.form?.get('typeGame')?.value.label)) {
              this.showExtraInfoDialog = true;

            } else {
              this.sendOutputData.emit({
                dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
                inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
                gameId: this.gameId,
                wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
                isSuccess: true,
                framePlayerResultList: [],
                framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value]
              } as Frame);
              this.resetForm();
              this.index++;
            }

          },
          reject: () => {
          }
        })
        break;
      case 'Echec':
        this.messageDialog = 'Echec';
        this.confirmationService.confirm({
          message: this.generateConfirmationMessage(this.form?.value, false),
          header: 'Confirmation de défaite',
          icon: 'pi pi-thumbs-down',
          acceptButtonStyleClass: 'p-button-outlined p-button-success',
          rejectButtonStyleClass: 'p-button-outlined p-button-danger',
          acceptLabel: 'Confirmer',
          rejectLabel: 'Refuser',
          accept: () => {
            this.sendOutputData.emit({
              dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
              inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
              gameId: this.gameId,
              wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
              isSuccess: false,
              framePlayerResultList: [],
              framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value]
            } as Frame);
            this.resetForm();
            this.index++;
          },
          reject: () => {
          }
        })
        break;
    }
  }

  // }

  setFramePlayers($event: any): void {
    console.log($event);
    if (this.players.length === 5) {
      this.framePlayers = [];
      this.players.forEach(p => {
        if (p.id !== $event.value.id) {
          this.framePlayers.push(p);
        }
      })
    } else {
      this.framePlayers = this.players;
    }
  }

  validateExtraInfo(): void {
    if (this.messageDialog) {
      this.sendOutputData.emit({
        dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
        inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
        gameId: this.gameId,
        wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
        isSuccess: true,
        framePlayerResultList: [],
        framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value]
      } as Frame);
    } else {
      this.sendOutputData.emit({
        dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
        inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
        gameId: this.gameId,
        wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
        isSuccess: false,
        framePlayerResultList: [],
        framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value]
      } as Frame);
    }

    this.resetForm();
    this.index++;
  }

  checkRadioButton(value: any) {
    switch (value) {
      case '1Win1Loose':
        this.showExtraPlayersDialog = true;
        this.extraFramePlayers = (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value]
        break;
      default:
        this.showExtraPlayersDialog = false;
    }
  }
}
