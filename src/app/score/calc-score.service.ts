import { Injectable } from '@angular/core';
import { Rule } from "../shared/rule";
import { Dice } from "../shared/dice";
import { toNumber, ucfirst } from "../utils";

@Injectable()
export class CalcScoreService {

  constructor() { }

  getAllPositions(dice: Dice[]): { position: string, score: number }[] {
    let res = [];
    for (let position of Object.keys(SCORE_POSITIONS)) {
      res.push({
        position,
        name  : SCORE_POSITIONS[ position ].name,
        score : this.position(position, dice)
      });
    }

    return res;
  }

  position(position: string, dice: Dice[]): number {
    if (!SCORE_POSITIONS.hasOwnProperty(position)) {
      return 0;
    }

    let { name, rule, args } = SCORE_POSITIONS[ position ];

    return this[ 'calc' + ucfirst(rule) ](dice, args);
  }

  protected calcMandatory(dice: Dice[], args: number[]): number {
    let [ seekCount, seekNum ] = args,
        count                  = dice.reduce((c, d) => c += +(d.number == seekNum), 0);

    return (count - seekCount) * seekNum;
  }

  protected calcIdentical(dice: Dice[], args: number[]): number {
    let [ count ] = args,
        map       = this.buildIdenticalMap(dice);

    let result = 0;

    for (let num of Object.keys(map)) {
      if (map[ num ] >= count) {
        result = Math.max(result, count * (+num));
      }
    }

    return result;
  }

  protected calcIdenticalGroup(dice: Dice[], args: number[]): number {
    // TODO: simplify with sort
    let [ smallerGroup, biggerGroup ] = args.sort(),
        map                           = this.buildIdenticalMap(dice);

    let smallGroupResult = 0,
        bigGroupResult   = 0;

    let getGroupScore = function (map: object, group: number): number {
      let bestGroup = 0,
          bestCount = 0;

      for (let num of Object.keys(map)) {
        if (map[ num ] >= group && bestCount < map[ num ]) {
          bestGroup = +num;
          bestCount = map[ num ];
        }
      }


      if (!bestGroup) {
        return 0;
      }

      let res = bestGroup * group;
      map[ bestGroup ] -= group;

      return res;
    };

    if (!(bigGroupResult = getGroupScore(map, biggerGroup))) {
      return 0;
    }

    if (!(smallGroupResult = getGroupScore(map, smallerGroup))) {
      return 0;
    }


    return smallGroupResult + bigGroupResult;
  }

  protected calcSequence(dice: Dice[], args: number[]): number {
    let sorted = dice.slice().sort((a, b) => a.number > b.number ? 1 : (a.number < b.number ? -1 : 0));

    let idx = 0, sum = 0;

    for (let v = args[ 0 ]; v <= args[ 1 ]; v++) {
      if (sorted[ idx ].number != v) {
        return 0;
      }

      sum += v;
      idx++;
    }

    return sum;
  }

  protected calcAny(dice: Dice[]): number {
    return dice.reduce((sum, d) => sum += d.number, 0);
  }

  protected buildIdenticalMap(dice: Dice[]): object {
    let map = {};

    for (let d of dice) {
      map[ d.number ] = toNumber(map[ d.number ]) + 1;
    }

    return map;
  }
}

export const SCORE_POSITIONS: { [key: string]: Rule } = {
  'aces'      : { name : 'Aces', rule : 'mandatory', args : [ 3, 1 ] },
  'twos'      : { name : 'Twos', rule : 'mandatory', args : [ 3, 2 ] },
  'threes'    : { name : 'Threes', rule : 'mandatory', args : [ 3, 3 ] },
  'fours'     : { name : 'Fours', rule : 'mandatory', args : [ 3, 4 ] },
  'fives'     : { name : 'Fives', rule : 'mandatory', args : [ 3, 5 ] },
  'sixes'     : { name : 'Sixes', rule : 'mandatory', args : [ 3, 6 ] },
  'pair'      : { name : 'Pair', rule : 'identical', args : [ 2 ] },
  'two-pairs' : { name : 'Two pairs', rule : 'identicalGroup', args : [ 2, 2 ] },
  '3-kind'    : { name : '3 of a kind', rule : 'identical', args : [ 3 ] },
  '4-kind'    : { name : '4 of a kind', rule : 'identical', args : [ 4 ] },
  'full'      : { name : 'Full house', rule : 'identicalGroup', args : [ 3, 2 ] },
  'small'     : { name : 'Small straight', rule : 'sequence', args : [ 1, 5 ] },
  'large'     : { name : 'Large straight', rule : 'sequence', args : [ 2, 6 ] },
  'chance'    : { name : 'Chance', rule : 'any', args : [] },
  'general'   : { name : 'General', rule : 'identical', args : [ 5 ], bonus : 50 }
};
