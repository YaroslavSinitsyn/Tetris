import { Component, HostListener, AfterViewInit} from '@angular/core';
import { Figure } from '../share/figure';
import { figureDate } from '../share/figureData';
import { ScoreService } from '../share/score.service';

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
  columnMax: number = 15;
  columnMin: number = -1;
  count:number = 0;
  interval;
  currentFigure: Figure;
  currentFigureArray:Figure[];
  fillArrayBlock:string[] = new Array<string>();
  lastFigure: Figure;
  countFigure:number;
  flag:boolean = false;
  flagMove:boolean = false;
 
  
   constructor(private valueScore:ScoreService ) {
    this.gridArray = this.gridData();
    this.createNewFigure();
  }

  ngAfterViewInit(): void {
     this.showFigure(this.currentFigureArray[0]);
     this.start();
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KeyCode.leftCode:
            if(this.checkFigure(Direction.left))
              this.move(Direction.left);
        break;
      case KeyCode.rightCode:
            if(this.checkFigure(Direction.rigth))
              this.move(Direction.rigth);
        break;
      case KeyCode.upCode:
            let tempFigure:Figure = this.currentFigureArray[this.countFigure];
            
            let length = this.currentFigureArray.length - 1;
            let flag:boolean = true;
            
            if(this.countFigure !== length) {
               this.countFigure++;
            }
            else {
              this.countFigure = 0;
            }

            while(this.countFigure <= length) {
              let figure:Figure = new Figure();
              figure = this.currentFigureArray[this.countFigure];
              flag = true;
              
              for(let index in figure) {
                if(index !== 'type') {
                  let block = figure[index];
                  let rowColumn = block.split('.');
                
                  if(+rowColumn[1] < 0)
                    flag = false;
              
                  if(+rowColumn[1] > this.columnMax-1)
                    flag = false;
                }
             }

            if(flag)
              break;
            else {
              if(this.countFigure === length) {
                this.countFigure = 0;
              } 
              else
                this.countFigure++;
            }
               
          }

            if(flag) {
              this.clearFigure(tempFigure);
              this.showFigure(this.currentFigureArray[this.countFigure]);
              this.currentFigure = this.currentFigureArray[this.countFigure];
            }
              
            break;
      case KeyCode.downCode:
            if(this.checkFigure(Direction.down))
              this.move(Direction.down);
        break;
      default:
        break;
    }
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

  checkFigure(direction:Direction):boolean {
    let figure = this.currentFigureArray[this.countFigure];
    
    for(let item in figure) {
      if(item !== 'type') {
        let str:string = figure[item];
        let arrStr:string[] = str.split('.');
        let index:number;
        let block:string;
        switch(direction) {
          case Direction.left:
              block = this.moveBlock(figure[item],direction);
              if(arrStr[1] === '0' || block === undefined)
                return false;

            break;
          case Direction.rigth:
              block = this.moveBlock(figure[item],direction);
              if(arrStr[1] === '14' || block === undefined)
                return false;
            break;
          case Direction.down:
              block = this.moveBlock(figure[item],direction);
              if(arrStr[0] === '19' || block === undefined)
                return false;
            break;
          default:
            break;
        }
                
      }     
    }
    return true;
  }

  sortArrayFill(a:string, b:string):number {
    let rowA:number = +a.split('.')[0];
    let rowB:number = +b.split('.')[0];

    if(rowA > rowB)
        return 1

    if(rowA < rowB)
        return -1;
                
    return 0;
  }

  cleareRow():void{

    if(this.fillArrayBlock.length !== 0) {
      let tempFillSort:string[] = this.fillArrayBlock.sort(this.sortArrayFill);
      let blockMin:number = +((tempFillSort[0].split('.'))[0]);
      let blockMax:number = +((tempFillSort[this.fillArrayBlock.length-1].split('.'))[0]);
      
      console.log(blockMin);
      console.log(blockMax);
      while(blockMin <= blockMax) {
          let tempArray:string[] = new Array<string>();
          tempArray= tempFillSort.filter(block => {
          let row:number = +(block.split('.')[0]);
          if(blockMax === row)
            return block;
          });

          if(tempArray.length === this.columnMax) {
            tempArray.forEach(item => {
              document.getElementById(item).setAttribute("fill", "#fff");
            });

            this.fillArrayBlock.forEach(item => {
                  document.getElementById(item).setAttribute("fill", "#fff");
              });

            this.fillArrayBlock = this.fillArrayBlock.filter(item => {
                let rowTemp:number = +(item.split('.')[0]);
                let columnTemp:string = (item.split('.')[1]);
                if(blockMax !== rowTemp) {
                  return item;
                }

              }).map(block => {
                let rowTemp:number = +(block.split('.')[0]);
                let columnTemp:string = (block.split('.')[1]);
                if(blockMax > rowTemp) {
                    return `${rowTemp+1}.${columnTemp}`;
                }
                else
                  return block;
              });

              this.fillArrayBlock.forEach(item => {
                  document.getElementById(item).setAttribute("fill", "#2C93E8");
              });

              this.valueScore.setScore();
              tempFillSort = this.fillArrayBlock.sort(this.sortArrayFill);
              blockMin = +((tempFillSort[0].split('.'))[0]);
              blockMax = +((tempFillSort[this.fillArrayBlock.length-1].split('.'))[0]);

              console.log(blockMin);
              console.log(blockMax);
          }
          else
            blockMax--
      }
    }
    
  }


  start(): void {
    this.interval = setInterval(() => {
        this.move(Direction.down);
        
        if(this.flag) {
          this.createNewFigure();
          this.showFigure(this.currentFigureArray[this.countFigure]);
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

  move(direction:Direction) {
    this.clearFigure(this.currentFigureArray[this.countFigure]);
    
    let tempCurrentFigureArray = new Array<Figure>();
    let tempFigure:Figure = new Figure();
    let fig:Figure = new Figure();
    
    for(let figure of this.currentFigureArray) {
      tempFigure = this.moveFigure(figure, direction);
      if(figure === this.currentFigureArray[this.countFigure])
        fig = tempFigure;

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
      let index = tempCurrentFigureArray.indexOf(fig);
      this.countFigure = index;
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
    this.cleareRow();
    this.currentFigure = figureDate[this.count];
    this.currentFigureArray = new Array<Figure>();

    this.currentFigureArray = figureDate.filter( figure => {
      if(figure.type == this.currentFigure.type) {
        return figure
      }
    });

    this.countFigure = this.currentFigureArray.indexOf(this.currentFigure);
    if(figureDate.length-1 !== this.count)
        this.count++; 
    else
      this.count = 0
  }

  moveFigure(figure:Figure, direction:Direction):Figure {

    let newFigure = new Figure();
    let block:string;
    for(let key in figure) {
      if (key !== 'type') {
          block = this.moveBlock(figure[key],direction);
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

  moveBlock(block:string, direction:Direction):string {
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
        let temp:string[] = block.split('.')
        let ind:number = this.fillArrayBlock.indexOf(`${temp[0]}.${+temp[1] - 1}`);
        if(ind === -1)
          newBlock = `${rowColumn[0]}.${+rowColumn[1] - 1}`;
        else
          newBlock = undefined;
        break;
      case Direction.rigth:
        let t:string[] = block.split('.')
        let i:number = this.fillArrayBlock.indexOf(`${t[0]}.${+t[1] + 1}`);
        if(i === -1)
          newBlock = `${rowColumn[0]}.${+rowColumn[1] + 1}`;
        else
          newBlock = undefined;
        break;
      default:
        console.error('Error move method bad parameter direction');
        break;
    }
    return newBlock;
  }


}
