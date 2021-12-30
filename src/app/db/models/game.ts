import {Player} from "./player";
import {Frame} from "./frame";

export interface Game {
  id?: number;
  players: Player[];
  framesNumber?: number;
  state?: GameState;
  frames: Frame[];
}
export enum GameState {
  CREATION,
  EN_COURS,
  TERMINEE
}
