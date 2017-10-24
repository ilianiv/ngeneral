import { Component } from '@angular/core';
import { Player } from './shared/player';
import { DiceService } from "./dice/dice.service";
import { ScoreService } from "./score/score.service";

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : [ './app.component.css' ]
})
export class AppComponent {
  title   = 'app';
  player = <Player>{ name : 'Iliyan', id: '1' };


  constructor(protected scoreSvc: ScoreService, protected diceSvc: DiceService) {
    this.scoreSvc.addPlayer(this.player);
    this.diceSvc.player = this.player;
  }
}
