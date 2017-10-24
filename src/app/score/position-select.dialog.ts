import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from "@angular/material";
import { CalcScoreService } from "./calc-score.service";
import { Player } from "../shared/player";
import { Dice } from "../shared/dice";
import { ScoreService } from "./score.service";

@Component({
  selector : 'app-position-select',
  template : `
    <h2 md-dialog-title>Score position</h2>
    <md-dialog-content>
      <md-radio-group [(ngModel)]="selectedPosition">
        <md-list>
          <ng-container *ngFor="let pos of positions">
            <md-list-item *ngIf="pos.score > 0 || !hideNegative">
              <md-radio-button class="example-radio-button" [value]="pos">
                {{pos.name}} ({{pos.score}} points)
              </md-radio-button>
            </md-list-item>
          </ng-container>
        </md-list>
      </md-radio-group>
    </md-dialog-content>
    <md-slide-toggle [(ngModel)]="hideNegative">
      Show only positive scores
    </md-slide-toggle>
    <md-dialog-actions>
      <button md-button [md-dialog-close]="selectedPosition" [disabled]="!selectedPosition">Next</button>
    </md-dialog-actions>
  `
})

export class PositionSelectDialog implements OnInit {
  player: Player;
  dice: Dice[];
  positions: { position: string, score: number }[] = [];
  selectedPosition: { position: string, score: number };
  hideNegative: boolean                            = true;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public scoreSvc: ScoreService,
              public calcSvc: CalcScoreService) {
    this.player    = data.player;
    this.dice      = data.dice;
    this.positions = this.calcSvc.getAllPositions(this.dice);
  }

  ngOnInit() { }
}