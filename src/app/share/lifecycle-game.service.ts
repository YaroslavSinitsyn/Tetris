import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


export enum CycleGame {
    NewGame, Start, Pause, HighScore, GameOver
}

@Injectable()
export class GameCycleService {
    state:CycleGame = CycleGame.NewGame;
    
    getState() {
        return this.state;
    }
    // Observable string sources
    private gameEvent = new Subject<CycleGame>();

    // Observable string streams
    gameEvent$ = this.gameEvent.asObservable();

    
    startGame() {
        this.gameEvent.next(CycleGame.Start);
    }

    newGame() {
        this.gameEvent.next(CycleGame.NewGame);
    }

    pauseGame() {
        this.gameEvent.next(CycleGame.Pause);
    }

    highScore() {
        this.gameEvent.next(CycleGame.HighScore);
    }

    gameOver() {
        this.state = CycleGame.GameOver;
        this.gameEvent.next(CycleGame.GameOver);
    }
}