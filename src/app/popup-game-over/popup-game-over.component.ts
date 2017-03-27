import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Score } from "app/share/score";
import { ScoreService } from "app/share/score.service";
import { DataBaseService } from "app/share/data-base.service";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { GameCycleService } from "app/share/lifecycle-game.service";

@Component({
  selector: 'app-popup-game-over',
  templateUrl: './popup-game-over.component.html',
  styleUrls: ['./popup-game-over.component.css']
})
export class PopupGameOverComponent {
  valueScore:Score;
  nameUser:string="";
  items$:FirebaseListObservable<any>;

    
  constructor(private scoreService:ScoreService, private af: AngularFire, private gameService:GameCycleService) {
        this.valueScore = this.scoreService.getScore();
        this.items$ = this.af.database.list('');
  }
  
  onKey(event:any) {
    this.nameUser = event.target.value;
  }

  onSave() {
    console.log('Save');
    console.log(this.nameUser);
    let now:Date = new Date();
    let strDate:string = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;

    this.items$.push({
        name:this.nameUser,
        score:this.valueScore.point,
        date:strDate
      });
   
   if(this.nameUser !== '')
      this.gameService.highScore();
  }

}
