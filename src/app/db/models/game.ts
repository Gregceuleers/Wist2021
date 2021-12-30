import {Player} from "./player";
import {Frame} from "./frame";

export interface Game {
  id?: number;
  players: Player[];
  framesNumber: number;
  state?: GameState;
  created?: Date;
  frames: Frame[];
  currentFrame: number;
}
export enum GameState {
  CREATION,
  EN_COURS,
  TERMINEE
}
