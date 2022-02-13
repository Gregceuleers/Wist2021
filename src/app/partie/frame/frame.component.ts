import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Frame} from "../../db/models/frame";
import {Player} from "../../db/models/player";
import {GameService} from "../../db/services/game.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {typesManche} from "../../db/services/config";
import {ConfirmationService} from "primeng/api";
import {EndResultPlayer} from "../../db/models/end-result-player";
import {only2SelectedPlayerValidation} from "./custom-validators";

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
  @Input() endGameResults: EndResultPlayer[] = [];
  @Input() endGame = false;

  @Output() sendOutputData: EventEmitter<Frame> = new EventEmitter<Frame>();
  @Output() sendEndGame: EventEmitter<boolean> = new EventEmitter<boolean>();

  index: number = 1;
  gameId: number | undefined = 0;
  form: FormGroup | undefined;
  extraResult: string | undefined;
  typesGame = typesManche;
  framePlayers: { player: Player, inactive: boolean }[] = [];
  extraFramePlayers: Player[] = [];
  showExtraInfoDialog = false;
  showExtraPlayersDialog = false;
  showInfoDialog = false;
  showExtraPointByFold = false;
  hiddenPlayerFormControl = true;

  messageDialog = '';
  messageInfoDialog = '';
  messageContentDialog = '';
  winnerExtraResult: any;
  winnerExtraFoldResult: any;
  looserExtraResult: any;
  validation2Players: Player[] = [];
  isSuccess = false;
  isMaldoneOrPasse = false;

  folds = [] as any[];
  messageExtraPointByFold = '';

  constructor(
    private gameService: GameService,
    private confirmationService: ConfirmationService,
    private builder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.framePlayers = this.players.map(p => {
      return {player: p, inactive: false}
    });
    this.form = this.builder.group({
      dealer: [null, Validators.required],
      typeGame: [null, Validators.required],
      players: [null, [Validators.required]]
    });

    this.gameService.getCurrentGame().subscribe(current => {
      if (current != null) {
        this.index = current.currentFrame;
        this.gameId = current.id;
      }
    })
  }

  checkValidity(): void {
    if ('length' in this.form?.get('players')?.value) {

      if (this.form?.get('players')?.value.length >= 2) {
        for (let p of this.framePlayers as { player: Player, inactive: boolean }[]) {
          if (!(this.form?.get('players')?.value as { player: Player, inactive: boolean }[]).includes(p)) {
            p.inactive = true;
          }
        }
      } else {
        for (let p of this.framePlayers as { player: Player, inactive: boolean }[]) {
          p.inactive = false;
        }
      }
    } else {
      console.log(this.form?.get('players')?.value)
    }

    console.log(this.framePlayers)
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

  generateConfirmationMessage(form: any, aReussi: boolean): string {

    let player, player1, message = '';

    if (this.form?.get('typeGame')?.value.label === 'Passe') {
      message = 'Tous les joueurs passent ...';
    } else if (this.form?.get('typeGame')?.value.label === 'Mal done') {
      message = this.form?.get('players')?.value.player.name + ' a réalisé une mal done ...';
    } else {
      if (this.form?.get('typeGame')?.value.jeuADeux) {
        const players = (this.form?.get('players')?.value as { player: Player, inactive: boolean }[]);
        const verbe = aReussi ? ' ont réussi ' : ' ont raté ';
        player = players !== undefined ? players[0].player.name : '';
        player1 = players !== undefined ? players[1].player.name : '';
        message = player + ' et ' + player1 + verbe + this.form?.get('typeGame')?.value.label
      } else {
        const players = (this.form?.get('players')?.value as any);
        const verbe = aReussi ? ' a réussi ' : ' a raté ';
        player = players !== undefined ? players.player.name : '';
        message = player + verbe + this.form?.get('typeGame')?.value.label

      }
    }


    return message;
  }

  private generateInactivePlayer(inactivePlayer: Player): string | undefined {
    return (this.players.length === 5) ? inactivePlayer.name : undefined;
  }

  checkIfOpenExtraPointDialog(form: FormGroup): boolean {
    switch (form.get('typeGame')?.value?.label) {
      case 'Mal done':
      case 'Passe':
      case 'Petite misère à 2':
      case 'Grande misère à 2':
      case 'Piccolo à 2':
      case 'Piccolissimo à 2':
        return true;
    }

    return false;
  }

  submit(event: Event): void {

    this.folds = [] as any[];

    switch ((event as SubmitEvent)?.submitter?.innerText) {
      case 'Réussite':
        this.isSuccess = true;
        this.messageDialog = 'Réussite';
        this.messageInfoDialog = " de réussite";
        this.folds = this.calculateFolds(this.form?.get('typeGame')?.value.label, true);
        if (this.folds.length > 0) {
          this.showExtraPointByFold = true;
          this.messageExtraPointByFold = 'supplémentaires';
        }
        this.messageContentDialog = this.generateConfirmationMessage(this.form?.value, true);
        this.showInfoDialog = true;

        break;
      case 'Echec':
        this.isSuccess = false;
        this.messageDialog = 'Echec';
        this.messageInfoDialog = ' d\'échec';
        this.folds = this.calculateFolds(this.form?.get('typeGame')?.value.label, false);
        if (this.folds.length > 0) {
          this.showExtraPointByFold = true;
          this.messageExtraPointByFold = 'manquantes';
        }
        this.messageContentDialog = this.generateConfirmationMessage(this.form?.value, false);
        this.showInfoDialog = true;

        break;
      case 'Valider':
        if (this.isMaldoneOrPasse) {
          this.isSuccess = false;
          this.messageContentDialog = this.generateConfirmationMessage(this.form?.value, true);
          this.showInfoDialog = true;
        } else {
          this.showExtraInfoDialog = true;
        }
        break;
    }
  }

  setFramePlayers($event: any): void {

    this.form?.get('players')?.reset();
    this.form?.get('players')?.updateValueAndValidity();


    if (this.players.length === 5) {
      this.framePlayers = [];
      this.players.forEach(p => {
        if (p.id !== $event.value.id) {
          this.framePlayers.push({
            player: p,
            inactive: false
          });
        }
      })
    } else {
      this.framePlayers = this.players.map(p => {
        return {
          player: p,
          inactive: false
        }
      });
    }
    this.resetValidationJeuADeux();

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
    this.hiddenPlayerFormControl = true;
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

  validateGameInfo(): void {

    this.hiddenPlayerFormControl = true;

    if (this.isMaldoneOrPasse) {
      this.sendOutputData.emit({
        dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
        inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
        gameId: this.gameId,
        wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
        framePlayerResultList: [],
        framePlayers: [this.form?.get('players')?.value ? this.form?.get('players')?.value : this.form?.get('dealer')?.value],
      } as Frame);
      this.isMaldoneOrPasse = false;
      this.resetForm();
      this.index++;
    } else {
      switch (this.messageDialog) {
        case 'Réussite':
          this.sendOutputData.emit({
            dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
            inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
            gameId: this.gameId,
            wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
            success: true,
            framePlayerResultList: [],
            framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value],
            foldNumber: this.generateFoldValue()
          } as Frame);
          this.resetForm();
          this.index++;
          break;
        case 'Echec':
          this.sendOutputData.emit({
            dealer: this.form?.get('dealer')?.value ? this.form?.get('dealer')?.value?.name : '',
            inactivePlayer: this.generateInactivePlayer(this.form?.get('dealer')?.value),
            gameId: this.gameId,
            wistGameInfoLabel: this.form?.get('typeGame')?.value.label,
            success: false,
            framePlayerResultList: [],
            framePlayers: (this.form?.get('players')?.value.length) ? this.form?.get('players')?.value : [this.form?.get('players')?.value],
            foldNumber: this.generateFoldValue()
          } as Frame);
          this.resetForm();
          this.index++;
          break;
      }
    }


    this.showInfoDialog = false;
    this.winnerExtraFoldResult = null;
  }

  showContentMessage(): string {
    return this.messageContentDialog;
  }

  private calculateFolds(wistInfoGameLabel: string, isSuccess: boolean): any[] {
    let mux = 0;
    let output = [];

    if (isSuccess) {
      switch (wistInfoGameLabel) {
        case 'Emballage à 8':
          mux = 5;
          break;
        case 'Emballage à 9':
          mux = 4;
          break;
        case 'Emballage à 10':
          mux = 3;
          break;
        case 'Emballage à 11':
          mux = 2;
          break;
        case 'Seul 6':
          mux = 7;
          break;
        case 'Seul 7':
          mux = 6
          break;
        case 'Seul 8':
          mux = 5
          break;
      }
    } else {
      switch (wistInfoGameLabel) {
        case 'Emballage à 8':
          mux = 8;
          break;
        case 'Emballage à 9':
          mux = 9;
          break;
        case 'Emballage à 10':
          mux = 10;
          break;
        case 'Emballage à 11':
          mux = 11;
          break;
        case 'Seul 6':
          mux = 6;
          break;
        case 'Seul 7':
          mux = 7
          break;
        case 'Seul 8':
          mux = 8
          break;
      }
    }

    if (isSuccess) {
      for (let i = 0; i <= mux; i++) {
        if (mux != 0) {
          output.push({
            name: '+ ' + i,
            value: i
          });
        }
      }
    } else {
      for (let i = 0; i < mux; i++) {
        output.push({
          name: '- ' + (i + 1),
          value: i + 1
        });
      }
    }

    return output;
  }

  private generateFoldValue(): number | null {
    if (this.winnerExtraFoldResult) {
      if (this.winnerExtraFoldResult.value === 0) return null;
      return this.winnerExtraFoldResult.value;
    } else return null;
  }

  resetFoldData(): void {
    this.showExtraPointByFold = false;
    this.isSuccess = false;
  }

  resetValidationJeuADeux(): void {
    if (this.form?.get('typeGame')?.value && this.form?.get('typeGame')?.value.jeuADeux) {
      this.form?.get('players')?.addValidators(only2SelectedPlayerValidation(false));
      this.form?.get('players')?.updateValueAndValidity();

    } else {
      this.form?.get('players')?.setValidators([Validators.required]);
      this.form?.get('players')?.updateValueAndValidity();
      // }
    }
    console.log(this.form?.get('players'));
  }

  verify(event: any): void {
    this.hiddenPlayerFormControl = false;

    this.framePlayers = this.framePlayers.map(framePlayer => {
      return {
        player: framePlayer.player,
        inactive: false
      }
    });

    this.resetValidationJeuADeux();

    if (!this.form?.get('players')?.hasValidator(Validators.required)) {
      this.form?.get('players')?.addValidators(Validators.required);
      this.form?.get('players')?.updateValueAndValidity();
    }

    this.form?.get('players')?.reset();
    this.form?.get('players')?.updateValueAndValidity();

    switch (event.node.label) {
      case 'Mal done':
        this.isMaldoneOrPasse = true;
        break;
      case 'Passe':
        this.isMaldoneOrPasse = true;
        this.form?.get('players')?.removeValidators(Validators.required);
        this.form?.get('players')?.updateValueAndValidity();
        this.hiddenPlayerFormControl = true;
        break;
    }
  }
}
