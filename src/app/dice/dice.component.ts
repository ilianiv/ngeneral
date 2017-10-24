import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Dice } from "../shared/dice";

@Component({
  selector    : 'app-dice',
  templateUrl : './dice.component.html',
  styleUrls   : [ './dice.component.css' ]
})
export class DiceComponent {
  @Input() dice: Dice        = new Dice();
  @Input() readonly: boolean = false;

  constructor() { }

  @HostListener('click')
  click() {
    if (this.readonly) {
      return;
    }

    this.dice.toggle();
  }
}
