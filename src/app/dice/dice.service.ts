import { Injectable } from '@angular/core';
import { Dice } from '../shared/dice';
import { CalcScoreService } from "../score/calc-score.service";
import { Subject } from "rxjs/Subject";
import { Player } from "../shared/player";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { PositionSelectDialog } from "../score/position-select.dialog";
import { ScoreService } from "../score/score.service";

@Injectable()
export class DiceService {
  readonly maxRolls = 3;

  roll$: Subject<Dice[]> = new Subject();
  submit$: Subject<any>  = new Subject();

  dice: Dice[];
  rolls = 0;

  protected _player: Player;

  constructor(protected calcSvc: CalcScoreService, protected scoreSvc: ScoreService, protected dialog: MdDialog) {
    this.reset();
  }

  get player(): Player {
    return this._player;
  }

  set player(value: Player) {
    this._player = value;
  }

  submit() {
    let dialogRef = this.dialog
      .open(PositionSelectDialog, <MdDialogConfig>{
        data : {
          player : this._player,
          dice   : this.dice
        }
      });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.scoreSvc.setPoints(this._player, result.position, result.score);
        this.reset();
        this.submit$.next()
      });
  }

  roll() {
    if (this.rolls >= this.maxRolls) {
      return;
    }

    let diceRolled = 0;

    this.dice.map(d => {
      if (d.selected || !d.number) {
        d.roll();
        diceRolled++;
      }
    });

    if (diceRolled) {
      this.rolls++;
      this.afterDiceRolled();
    }
  }

  rollsLeft() {
    return this.maxRolls - this.rolls;
  }

  canRoll() {
    return this.maxRolls > this.rolls;
  }

  canSubmit() {
    return this.rolls > 0;
  }

  protected afterDiceRolled() {
    this.dice.map(d => d.deselect());
    this.roll$.next(this.dice);

    if (this.rollsLeft() === 0) {
      this.submit();
    }
  }

  protected reset() {
    this.dice  = Array(5).fill(1).map(i => new Dice());
    this.rolls = 0;
  }
}