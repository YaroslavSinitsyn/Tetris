import { Component } from '@angular/core';

@Component({
  selector: 'app-table-high-score',
  templateUrl: './table-high-score.component.html',
  styleUrls: ['./table-high-score.component.css']
})
export class TableHighScoreComponent {

  games : [{
        game: string,
        platform : string,
        release : string
    }];
    constructor(){

        this.games = [{
            game : "Deus Ex: Mankind Divided",
            platform: " Xbox One, PS4, PC",
            release : "August 23"
        },
        {
            game : "Hue",
            platform: " Xbox One, PS4, Vita, PC",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "Deus Ex: Mankind Divided",
            platform: " Xbox One, PS4, PC",
            release : "August 23"
        },
        {
            game : "Hue",
            platform: " Xbox One, PS4, Vita, PC",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "Deus Ex: Mankind Divided",
            platform: " Xbox One, PS4, PC",
            release : "August 23"
        },
        {
            game : "Hue",
            platform: " Xbox One, PS4, Vita, PC",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "Deus Ex: Mankind Divided",
            platform: " Xbox One, PS4, PC",
            release : "August 23"
        },
        {
            game : "Hue",
            platform: " Xbox One, PS4, Vita, PC",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "Deus Ex: Mankind Divided",
            platform: " Xbox One, PS4, PC",
            release : "August 23"
        },
        {
            game : "Hue",
            platform: " Xbox One, PS4, Vita, PC",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        },
        {
            game : "The Huntsman: Winter's Curse",
            platform: "PS4",
            release : "August 23"
        }]
    };
}
