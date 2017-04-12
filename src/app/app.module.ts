import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

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
import { AppMainComponent } from './app-main/app-main.component';

//определение маршрутов
const appRoutes: Routes =[
    { path: '', component: AppMainComponent},
    { path: 'tableHigh', component: TableHighScoreComponent},
    { path: '**', component: RectComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RectComponent,
    ValueComponent,
    MenuPanelComponent,
    PrevieRectComponent,
    TableHighScoreComponent,
    PopupGameOverComponent,
    AppMainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ScoreService, GameCycleService, RectService, DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
