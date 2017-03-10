import { Component } from '@angular/core';
import { Score } from '../share/score';
import { ScoreService } from '../share/score.service';

@Component({
    moduleId:module.id,
    selector:'value-comp',
    templateUrl:'value.component.html',
    styleUrls:['value.component.css']
})
export class ValueComponent {

    valueScore:Score;
    constructor(private scoreService:ScoreService) {
        this.valueScore = this.scoreService.getScore();
    }
}