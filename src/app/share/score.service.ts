import { Score } from './score';

export class ScoreService {
    scoreValue:Score = new Score();
    
    getScore():Score {
        return this.scoreValue;
    }

    setScore():void {
        this.scoreValue.lines++;
        this.scoreValue.point += 100;

        if(this.scoreValue.point === 1000 ){
            this.scoreValue.level++;
        }
    }

    clearScore():void {
        this.scoreValue.lines = 1;
        this.scoreValue.level = 0;
        this.scoreValue.point = 0;
    }
}