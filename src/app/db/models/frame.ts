import {PlayerFrameResult} from "./player-frame-result";
import {Player} from "./player";

export interface Frame {
  id?:number;
  dealer: string;
  gameId?: number;
  inactivePlayer?: string;
  success?: boolean;
  wistGameInfoLabel: string;
  framePlayerResultList: PlayerFrameResult[];
  framePlayers: Player[];
  typeExtraGame?: string;
  winnerExtraGame?: Player;
  looserExtraGame?: Player;
}
