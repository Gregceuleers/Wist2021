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
  @Input() endGame = false;

  @Output() sendOutputData: EventEmitter<Frame> = new EventEmitter<Frame>();
  @Output() sendEndGame: EventEmitter<boolean> = new EventEmitter<boolean>();

  index: number = 1;
  gameId: number | undefined = 0;
  form: FormGroup | undefined;
  extraResult: string | undefined;
  typesGame = typesManche;
  framePlayers: Player[] = [];
  extraFramePlayers: Player[] = [];
  showExtraInfoDialog = false;
  showExtraPlayersDialog = false;
  messageDialog = '';
  winnerExtraResult: any;
  looserExtraResult: any;


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

  checkIfOpenExtraPointDialog(form: FormGroup): boolean {
    switch (form.get('typeGame')?.value?.label) {
      case 'Petite misère à 2':
      case 'Grande misère à 2':
      case 'Piccolo à 2':
      case 'Piccolissimo à 2':
        return true;
    }


    return false;
  }

  submit(event: Event): void {

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
      case 'Valider':
        this.showExtraInfoDialog = true;
        break;
    }
  }


  setFramePlayers($event: any): void {
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

    // Affectation des data à envoyer

    if (this.winnerExtraResult) {
      this.looserExtraResult = this.extraFramePlayers.find(p => p !== this.winnerExtraResult);
    }

    this.sendOutputData.emit({
      dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
      inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
      gameId: this.gameId,
      wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
      framePlayerResultList: [],
      framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value],
      typeExtraGame: this.extraResult,
      winnerExtraGame: this.winnerExtraResult,
      looserExtraGame: this.looserExtraResult
    } as Frame);


    this.resetForm();
    this.index++;

    this.showExtraInfoDialog = false;
  }

  checkRadioButton(value: any) {
    switch (value) {
      case '1Win1Loose':
        this.winnerExtraResult = undefined;
        this.looserExtraResult = undefined;
        this.showExtraPlayersDialog = true;
        this.extraFramePlayers = (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value]
        break;
      default:
        this.winnerExtraResult = undefined;
        this.looserExtraResult = undefined;
        this.showExtraPlayersDialog = false;
    }
  }

  checkValidationExtraDialog(): boolean {
    if (this.extraResult === '1Win1Loose') {
      if (!this.winnerExtraResult) return true;
    }
    return false;
  }

  end(): void {
    this.sendEndGame.emit(true);
  }
}
