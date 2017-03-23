import { Component } from '@angular/core';
import { RectComponent } from 'app/rect/rect.component';
import { ValueComponent } from 'app/value/value.component';
import { GameCycleService, CycleGame } from 'app/share/lifecycle-game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  condition:boolean = true;
  gameOver:boolean = false;

  constructor(private gameService:GameCycleService) {
    gameService.gameEvent$.subscribe( (val)=> {
      if(this.gameService.state !== CycleGame.HighScore && val == CycleGame.HighScore) {
        this.gameService.state = CycleGame.HighScore;
        this.condition = false
      }
      else
        this.condition = true;
      
      if(this.gameService.state === CycleGame.GameOver && val === CycleGame.GameOver) {
         this.gameOver = true;
      }
      else
        this.gameOver = false;
    });

  }
}
