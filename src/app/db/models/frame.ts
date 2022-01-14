import {PlayerFrameResult} from "./player-frame-result";
import {Player} from "./player";

export interface Frame {
  id?:number;
  dealer: string;
  gameId?: number;
  inactivePlayer?: string;
  isSuccess?: boolean;
  wistGameInfoLabel: string;
  framePlayerResultList: PlayerFrameResult[];
  framePlayers: Player[];
}
