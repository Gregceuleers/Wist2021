import {Player} from "./player";

export interface Game {
  id?: number;
  players: Player[];
  gameNumbers?: number;
}
