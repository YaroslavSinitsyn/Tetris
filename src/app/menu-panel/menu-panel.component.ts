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

  onClick(){
    console.log('ererteter');
    
    var toggle = document.querySelector("#flexy-nav__toggle");
    var nav = document.querySelector("#flexy-nav__items");
    nav.classList.contains("flexy-nav__items--visible") ? nav.classList.remove("flexy-nav__items--visible") : nav.classList.add("flexy-nav__items--visible");
  }
  onStart() {
    this.gameService.startGame();
  }

  onNewGame() {
    this.gameService.newGame();
  }

  onPause() {
    this.gameService.pauseGame();
  }

  onHighScore() {
    this.gameService.highScore();
  }

}
