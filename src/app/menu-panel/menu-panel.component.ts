import { Component } from '@angular/core';
import {GameCycleService} from '../share/lifecycle-game.service';

@Component({
  moduleId: module.id,
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.css']
})
export class MenuPanelComponent {
  
  constructor(private gameService:GameCycleService){}

  onStart() {
    this.gameService.startGame();
  }

  onStop() {
    this.gameService.stopGame();
  }

  onPause() {
    this.gameService.pauseGame();
  }

  onHighScore() {
    
  }

}
