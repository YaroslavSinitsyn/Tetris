import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


export enum CycleGame {
    Start,
    Stop,
    Pause,
    HigtScore
}

@Injectable()
export class GameCycleService {
    state:CycleGame = CycleGame.Stop;
    
    getState(){
        return this.state;
    }
    // Observable string sources
    private gameEvent = new Subject<CycleGame>();

    // Observable string streams
    gameEvent$ = this.gameEvent.asObservable();

    
    startGame() {
        this.gameEvent.next(CycleGame.Start);
    }

    stopGame() {
        this.gameEvent.next(CycleGame.Stop);
    }

    pauseGame() {
        this.gameEvent.next(CycleGame.Pause);
    }
}