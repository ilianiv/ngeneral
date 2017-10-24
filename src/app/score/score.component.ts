import { Component } from '@angular/core';
import { ScoreService } from "./score.service";
import { SCORE_POSITIONS } from "./calc-score.service";

@Component({
  selector    : 'app-score',
  templateUrl : './score.component.html',
  styleUrls   : [ './score.component.css' ]
})
export class ScoreComponent {
  positions: string[] = [];
  scorePositions      = SCORE_POSITIONS;

  constructor(public scoreSvc: ScoreService) {
    this.positions = Object.keys(SCORE_POSITIONS);
  }
}
