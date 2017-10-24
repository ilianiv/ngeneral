import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdListModule,
  MdRadioModule,
  MdSlideToggleModule,
  MdToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { DiceRollComponent } from './dice-roll/dice-roll.component';
import { DiceComponent } from './dice/dice.component';
import { ScoreComponent } from './score/score.component';
import { DiceService } from './dice/dice.service';
import { CalcScoreService } from "./score/calc-score.service";
import { PositionSelectDialog } from "./score/position-select.dialog";
import { ScoreService } from "./score/score.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations    : [
    AppComponent,
    DiceRollComponent,
    DiceComponent,
    ScoreComponent,
    PositionSelectDialog,
  ],
  imports         : [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MdToolbarModule,
    MdSlideToggleModule,
    MdCardModule,
    MdDialogModule,
    MdRadioModule,
  ],
  entryComponents : [ PositionSelectDialog ],
  providers       : [ DiceService, ScoreService, CalcScoreService ],
  bootstrap       : [ AppComponent ]
})
export class AppModule {
}
