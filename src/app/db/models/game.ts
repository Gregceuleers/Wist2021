import {Player} from "./player";
import {Frame} from "./frame";

export interface Game {
  id?: number;
  players: Player[];
  gameNumbers?: number;
  state?: GameState;
  frames: Frame[];
}
export enum GameState {
  CREATION,
  EN_COURS,
  TERMINEE
}
