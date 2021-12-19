import {Player} from "./player";

export interface Game {
  id?: number;
  players: Player[];
  gameNumbers?: number;
  state?: GameState
}
export enum GameState {
  CREATION,
  EN_COURS,
  TERMINEE
}
