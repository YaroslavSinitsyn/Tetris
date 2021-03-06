import { Component, HostListener, AfterViewInit} from '@angular/core';
import { Figure } from '../share/figure';
import { figureDate } from '../share/figureData'

class Rect {
  constructor(public id: string = '0.0', public x: number = 1, public y: number = 1, public width: number = 25, public height: number = 25) {}
}

enum KeyCode {
  leftCode = 37,
  upCode = 38,
  rightCode = 39,
  downCode = 40
}

enum Direction {
  down,
  left,
  rigth
}

@Component({
  moduleId: module.id,
  selector: 'rect-comp',
  templateUrl: 'rect.component.html',
  styleUrls: ['rect.component.css']
})
export class RectComponent implements AfterViewInit {
  gridArray: Rect[];
  rowMax: number = 20;
  columnMax: number = 10;
  columnMin: number = 0;
  count:number = 0;
  interval;
  currentFigure: Figure;
  currentFigureArray:Figure[];
  fillArrayBlock:string[] = new Array<string>();
  lastFigure: Figure;
  countFigure:number;
  flag:boolean = false;
 
  
   constructor() {
    this.gridArray = this.gridData();
    this.createNewFigure();
  }

  ngAfterViewInit(): void {
     this.showFigure(this.currentFigureArray[0]);
     this.start();
  }

  gridData(): Rect[] {
    let data: Rect[] = new Array<Rect>();
    let rect: Rect = new Rect();

    for (var row = 0; row < this.rowMax; row++) {
      for (var column = 0; column < this.columnMax; column++) {
        rect.id = `${row}.${column}`;
        data.push(new Rect(rect.id, rect.x, rect.y, rect.width, rect.height));
        rect.x += rect.width;
      }

      rect.x = 1;
      rect.y += rect.height
    }

    return data;
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KeyCode.leftCode:
    
        break;
      case KeyCode.rightCode:

        break;
      case KeyCode.upCode:
            this.clearFigure(this.currentFigureArray[this.countFigure]);
            let length = this.currentFigureArray.length - 1;
            if(this.countFigure !== length) {
              this.countFigure++;
              this.currentFigure = this.currentFigureArray[this.countFigure];
            }
            else
              this.countFigure = 0;

            this.showFigure(this.currentFigureArray[this.countFigure]);
            console.log(this.countFigure);
            break;
      case KeyCode.downCode:
            this.down();
        break;
      default:
        break;
    }
  }

  start(): void {
    this.interval = setInterval(() => {
      
        this.down();
        
        if(this.flag) {
          this.createNewFigure();
          this.showFigure(this.currentFigureArray[0]);
          this.flag = false;
          this.fillArrayBlock.forEach( block => {
            document.getElementById(block).setAttribute("fill", "#2C93E8");
        });
      }
    }, 1000);
  }

  stop(): void {
    clearInterval(this.interval);
  }

  down() {
    this.clearFigure(this.currentFigureArray[this.countFigure]);
    let tempCurrentFigureArray = new Array<Figure>();
    let tempFigure:Figure = new Figure();

    for(let figure of this.currentFigureArray) {
      tempFigure = this.moveFigure(figure, Direction.down);
      if(tempFigure !== undefined)
        tempCurrentFigureArray.push(tempFigure);
      else if((tempFigure === undefined) && figure === this.currentFigureArray[this.countFigure]) {
        this.flag = true;
        for(let item in figure) {
          if(item !== 'type')
            this.fillArrayBlock.push(figure[item]);
        }
          
      }
    }

    if(!this.flag) {
      this.currentFigureArray = [];
      this.currentFigureArray = [...tempCurrentFigureArray];
      this.showFigure(tempCurrentFigureArray[this.countFigure]);
    }
    
  }

  clearFigure(figure: Figure): void {
    for (let item in figure) {
      if (item.toString() !== 'type')
          document.getElementById(figure[item]).setAttribute("fill", "#fff");
    }
  }

  showFigure(figure: Figure): void {
    for (let item in figure) {
      if (item.toString() !== 'type')
        document.getElementById(figure[item]).setAttribute("fill", "#2C93E8");
    }
  }

  createNewFigure() {
    this.countFigure = 0;
    this.currentFigure = figureDate[this.count];
    this.currentFigureArray = new Array<Figure>();

    this.currentFigureArray = figureDate.filter( figure => {
      if(figure.type === this.currentFigure.type) {
        return figure
      }
    });

    this.count++;
  }

  moveFigure(figure:Figure, direction:Direction):Figure {

    let newFigure = new Figure();
    let block:string;
    for(let key in figure) {
      if (key !== 'type') {
          block = this.move(figure[key],direction);
          if(block !== undefined) {
            newFigure[key] = block
          }
          else{
            return newFigure = undefined;
          }
      }
    }

    return newFigure;
  }

  move(block:string, direction:Direction):string {
    let newBlock:string;
    let rowColumn = block.split('.');

    switch(direction) {
      case Direction.down:
        let tempBlock:string[] = block.split('.')
        let index:number = this.fillArrayBlock.indexOf(`${+tempBlock[0] + 1}.${tempBlock[1]}`);
        if((this.rowMax !== (+rowColumn[0] + 1)) && index === -1)
          newBlock = `${+rowColumn[0] + 1}.${rowColumn[1]}`;
        else
          newBlock = undefined;
        break;
      case Direction.left:
        newBlock = `${rowColumn[0]}.${+rowColumn[1] - 1}`;
        break;
      case Direction.rigth:
        newBlock = `${rowColumn[0]}.${+rowColumn[1] + 1}`;
        break;
      default:
        console.error('Error move method bad parameter direction');
        break;
    }
    return newBlock;
  }


}
