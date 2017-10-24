import { Component } from '@angular/core';
import { DiceService } from "../dice/dice.service";

@Component({
  selector    : 'app-dice-roll',
  templateUrl : './dice-roll.component.html',
  styleUrls   : [ './dice-roll.component.css' ]
})
export class DiceRollComponent {
  constructor(public diceSvc: DiceService) {}
}
