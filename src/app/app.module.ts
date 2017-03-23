import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';

import { AppComponent } from './app.component';
import { RectComponent } from './rect/rect.component';
import { ValueComponent } from 'app/value/value.component';
import { ScoreService } from 'app/share/score.service';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { GameCycleService } from './share/lifecycle-game.service';
import { RectService } from './rect/rect.service';
import { PrevieRectComponent } from './rect/previe-rect.component';
import { TableHighScoreComponent } from './table-high-score/table-high-score.component';
import { PopupGameOverComponent } from './popup-game-over/popup-game-over.component';
import { DataBaseService } from "./share/data-base.service";

@NgModule({
  declarations: [
    AppComponent,
    RectComponent,
    ValueComponent,
    MenuPanelComponent,
    PrevieRectComponent,
    TableHighScoreComponent,
    PopupGameOverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ScoreService, GameCycleService, RectService, DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
