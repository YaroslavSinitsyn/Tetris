import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { RectService } from '../rect/rect.service'
import { Rectangle } from "app/share/rectangle";
import { Figure } from "app/share/figure";

@Component({
  moduleId:module.id,
  selector: 'app-previe-rect',
  templateUrl: './previe-rect.component.html',
  styleUrls: ['./rect.component.css']
})
export class PrevieRectComponent implements OnInit, AfterViewInit {
  grid:Rectangle[];
  figure:Figure[];
  newFigure:Figure;
  index: number;
  @Input() row;
  @Input() column;

  constructor(private rectSerice:RectService) {
    rectSerice.changFigureEvent$.subscribe((val)=> {
      if(this.newFigure === undefined)
        return

      this.setColorFigure(this.newFigure,'#fff');
      [this.figure, this.index] = this.rectSerice.createFigure(this.rectSerice.nextFigureIndex);
      
      this.newFigure =  this.changeFigure(this.figure[0]);
      this.setColorFigure(this.newFigure,'#2C93E8');
    });
  }

  ngOnInit() {
    this.grid = this.rectSerice.createGrid(this.row, this.column);

    let shape = document.getElementsByTagName("svg")[1];
    console.log('ttttttttt');
    if(window.screen.height > 640) {
      shape.setAttribute("viewBox", "0 0 106 106"); 
    }
    else {
      shape.setAttribute("viewBox", "0 0 156 156"); 
    }
  }

  ngAfterViewInit(): void {
    [this.figure, this.index] = this.rectSerice.createFigure(this.rectSerice.nextFigureIndex);
    this.newFigure = this.changeFigure(this.figure[0]);
    this.setColorFigure(this.newFigure,'#2C93E8');
  }

  changeFigure(figure):Figure {
    let newFigure:Figure = new Figure();
    for(let item in figure){

      if(item !== 'type')
        newFigure[item] = `${figure[item].split('.')[0]}.${(+figure[item].split('.')[1] -3).toString()}`;

    }
    
    return newFigure;
  }

  setColorFigure(figure:Figure, color:string) {
    this.grid.map((item) => {
      for (let index in figure) {
        if(index.toString() === 'type') {
            continue;
        }
        if(item.id === figure[index])
            item.color = color;
      }
    });
  }

  setColorBlock(block:string, color:string){
    this.grid.map((item) => {
      if(item.id === block)
        item.color = color;
    });
  }

}
