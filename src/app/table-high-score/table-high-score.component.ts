import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";

class Record {
  name:string;
  date:string;
  score:number;
}

@Component({
  selector: 'app-table-high-score',
  templateUrl: './table-high-score.component.html',
  styleUrls: ['./table-high-score.component.css']
})
export class TableHighScoreComponent implements OnInit {

  arrayRecord:Record[];

  items$:FirebaseListObservable<any>;
  constructor(private af: AngularFire) {
    this.items$ = this.af.database.list('');
  };

  ngOnInit(): void {
    this.arrayRecord = new Array<Record>();
    this.items$.forEach(val => {
      for(let key in val) {
       let record:Record = new Record();
        console.log(val[key].name);
       record.name = val[key].name;
       record.date = val[key].date;
       record.score = val[key].score;
       this.arrayRecord.push(record);
      }
    });
  }
  
}
