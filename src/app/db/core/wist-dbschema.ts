import {DBSchema} from "idb";
import {Player} from "../models/player";
import {Game} from "../models/game";

export interface WistDBSchema extends DBSchema {
  'wist-database': {
    key: string;
    value: any;
  };
  players: {
    value: Player;
    key: string;
    indexes: { 'by-name': string};
  };
  games: {
    value: Game;
    key: number;
    indexes: {'by-id': number};
  }
}
