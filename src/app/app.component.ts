import { Component } from '@angular/core';
import { RectComponent } from 'app/rect/rect.component';
import { ValueComponent } from 'app/value/value.component';
import { GameCycleService, CycleGame } from 'app/share/lifecycle-game.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  condition:boolean = true;

  items:FirebaseListObservable<string[]>;

  constructor(private gameService:GameCycleService, private af: AngularFire) {
    gameService.gameEvent$.subscribe( (val)=> {
      if(this.gameService.state !== CycleGame.HighScore && val == CycleGame.HighScore){
        this.gameService.state = CycleGame.HighScore;
        this.condition = false
      }
      else
        this.condition = true;
    });

    af.database.list('/items').forEach(item=>{
      console.log(item);
    })
    //let newPostKey = firebase.database().ref().child('items');
    //console.log(newPostKey);
    //this.items = af.database.list('/items');

    // this.items.forEach((it)=>{
    //   console.log(it.$key);
    // })
    //this.items.first().subscribe(x => console.log(x.name));
  //   af.database.list('/data').flatMap(list => list)
  // //Get only the first item in this list
  // .first()
  // //Transform the value
  // .map(({name, firebaseKey}) => ({name: "test3", firebaseKey}))
  // //Subscribe to the stream
  // .subscribe(x => console.log(x));
    
  }
}
