import { Injectable } from '@angular/core';
import { Player } from "../shared/player";
import { SCORE_POSITIONS } from "./calc-score.service";

@Injectable()
export class ScoreService {
  score: { [playerId: string]: { [position: string]: number } } = {};

  protected _players: Player[] = [];

  constructor() { }

  get players() {
    return this._players;
  }

  addPlayer(player: Player) {
    if (this._players.find(p => p['id'] == player.id)) {
      return;
    }

    this._players.push(player);
    this.score[ player.id ] = {};
    for (let p of Object.keys(SCORE_POSITIONS)) {
      this.score[ player.id ][ p ] = null;
    }
  }

  setPoints(player: Player, position: string, points: number) {
    if (!this._players.find(p => p.id == player.id)) {
      return;
    }

    if (!this.score[player.id].hasOwnProperty(position) || this.score[player.id][position] !== null) {
      return;
    }

    this.score[player.id][position] = points;
    console.log(this.score);
  }
}