import {DBSchema} from "idb";
import {Player} from "../models/player";

export interface WistDBSchema extends DBSchema {
  'wist-database': {
    key: string;
    value: any;
  };
  players: {
    value: Player;
    key: string;
    indexes: { 'by-name': string};
  }
}
