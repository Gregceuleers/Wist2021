import {PlayerFrameResult} from "./player-frame-result";

export interface Frame {
  id:number;
  gameId: number;
  playerResults: PlayerFrameResult[];
}
