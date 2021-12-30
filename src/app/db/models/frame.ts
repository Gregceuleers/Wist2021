import {PlayerFrameResult} from "./player-frame-result";

export interface Frame {
  id?:number;
  dealer: string;
  gameId: number;
  playerResults: PlayerFrameResult[];
}
