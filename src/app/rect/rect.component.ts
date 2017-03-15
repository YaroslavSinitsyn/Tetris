import { Component, Input, HostListener, AfterViewInit, OnInit} from '@angular/core';
import { Figure } from '../share/figure';
import { figureDate } from '../share/figureData';
import { ScoreService } from '../share/score.service';
import { GameCycleService, CycleGame } from '../share/lifecycle-game.service';
import { RectService } from './rect.service';
import { Rectangle } from '../share/rectangle'


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
export class RectComponent implements OnInit, AfterViewInit {
  gridArray:Rectangle[];
  interval:any;
  currentFigureArray:Figure[] = new Array<Figure>();
  fillArrayBlock:string[] = new Array<string>();
  flag:boolean = false;
  index:number = 0;
  numFigure:number = 0;
  @Input() row;
  @Input() column;

  constructor(private rectService:RectService, private gameCycle:GameCycleService, private valueScore:ScoreService ) {
    gameCycle.gameEvent$.subscribe((val)=>{
      console.log(val);
      if(this.gameCycle.state !== CycleGame.Start && val == CycleGame.Start){
         this.gameCycle.state = CycleGame.Start;
         this.start();
      }
          
      if(this.gameCycle.state !== CycleGame.Stop && val == CycleGame.Stop){
        this.gameCycle.state = CycleGame.Stop;
        this.stop();
      }
          
      if(this.gameCycle.state !== CycleGame.Pause && val == CycleGame.Pause){
          this.gameCycle.state = CycleGame.Pause;
          this.stop();
      }
          
    })
  }

  ngOnInit(): void {
      this.gridArray = this.rectService.createGrid(this.row, this.column);
      this.numFigure = this.randomFigure();
      this.createFigure();
  }

  ngAfterViewInit(): void {
     this.setColorFigure(this.currentFigureArray[this.index], '#2C93E8');
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if(this.gameCycle.state === CycleGame.Stop)
        return;

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
            this.rotateFigure()
        break;
      case KeyCode.downCode:
            if(this.checkFigure(Direction.down))
              this.move(Direction.down);
        break;
      default:
        break;
    }
  }

  randomFigure():number {
    let length:number = figureDate.length;
    return Math.floor((Math.random() * length) + 1);
  }

  createFigure() {
    this.cleareRow();
    let tempTemp:[Figure[], number];
    tempTemp = this.rectService.createFigure(this.numFigure);
    this.currentFigureArray = tempTemp[0];
    this.index = tempTemp[1];
    this.numFigure = this.randomFigure();
  }

  rotateFigure():void {
    let tempFigure:Figure = this.currentFigureArray[this.index];        
    let length = this.currentFigureArray.length - 1;
    let flag:boolean = true;
            
    if(this.index !== length) {
      this.index++;
    }
    else {
      this.index = 0;
    }

    while(this.index <= length) {
      let figure:Figure = new Figure();
      figure = this.currentFigureArray[this.index];
      flag = true;
              
      for(let index in figure) {
        if(index !== 'type') {
          let block = figure[index];
          let rowColumn = block.split('.');
                
          if(+rowColumn[1] < 0)
              flag = false;
              
          if(+rowColumn[1] > this.column-1)
              flag = false;
        }
      }

      if(flag)
          break;
      else {
        if(this.index === length) {
          this.index = 0;
        } 
        else
          this.index++;
     }      
   }

   if(flag) {
    this.setColorFigure(tempFigure, '#fff');
    this.setColorFigure(this.currentFigureArray[this.index], '#2C93E8');
   }

  }
  
  checkFigure(direction:Direction):boolean {
    let figure = this.currentFigureArray[this.index];
    
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
              if(arrStr[1] === '9' || block === undefined)
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
      
      while(blockMin <= blockMax) {
          let tempArray:string[] = new Array<string>();
          tempArray= tempFillSort.filter(block => {
          let row:number = +(block.split('.')[0]);
          if(blockMax === row)
            return block;
          });

          if(tempArray.length === this.column) {
            tempArray.forEach(item => {
              this.setColorBlock(item,"#fff")
            });

            this.fillArrayBlock.forEach(item => {
                  this.setColorBlock(item,"#fff")
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
                  this.setColorBlock(item,"#2C93E8")
              });

              this.valueScore.setScore();
              tempFillSort = this.fillArrayBlock.sort(this.sortArrayFill);
              blockMin = +((tempFillSort[0].split('.'))[0]);
              blockMax = +((tempFillSort[this.fillArrayBlock.length-1].split('.'))[0]);
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
          this.createFigure();
          this.setColorFigure(this.currentFigureArray[this.index],'#2C93E8');
          this.flag = false;
          this.fillArrayBlock.forEach( block => {
            this.setColorBlock(block,'#2C93E8');
        });
      }
    }, 1000);
  }

  stop(): void {
    clearInterval(this.interval);
  }

  setColorFigure(figure:Figure, color:string) {
    this.gridArray.map((item) => {
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
    this.gridArray.map((item) => {
      if(item.id === block)
        item.color = color;
    });
  }

  move(direction:Direction) {
    this.setColorFigure(this.currentFigureArray[this.index],"#fff");
    
    let tempCurrentFigureArray = new Array<Figure>();
    let tempFigure:Figure = new Figure();
    let fig:Figure = new Figure();
    
    for(let figure of this.currentFigureArray) {
      tempFigure = this.moveFigure(figure, direction);
      if(figure === this.currentFigureArray[this.index])
        fig = tempFigure;

      if(tempFigure !== undefined)
        tempCurrentFigureArray.push(tempFigure);
      else if((tempFigure === undefined) && figure === this.currentFigureArray[this.index]) {
        this.flag = true;
        for(let item in figure) {
          if(item !== 'type')
                this.fillArrayBlock.push(figure[item]);
        }
      }   
    }

    if(!this.flag) {
      let index = tempCurrentFigureArray.indexOf(fig);
      this.index = index;
      this.currentFigureArray = [];
      this.currentFigureArray = [...tempCurrentFigureArray];
      this.setColorFigure(tempCurrentFigureArray[this.index],'#2C93E8');
    }
    
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
    newBlock = this.changeBlock(direction,rowColumn[0], rowColumn[1], this.fillArrayBlock);

    return newBlock;
  }

  changeBlock(direction:Direction, row:string, column:string, mapBlockFill:string[]):string {
    let index:number;
    let block:string;
    switch(direction){
      case Direction.down:
          block = `${+row + 1}.${column}`;
          index = mapBlockFill.indexOf(block);
          if(this.row !== (+row + 1) && index === -1)
            return block;
        break;
      case Direction.left:
          block = `${row}.${+column - 1}`;
          index = mapBlockFill.indexOf(block);
          if(index === -1)
            return block;
        break;
      case Direction.rigth:
          block = `${row}.${+column + 1}`;
          index = mapBlockFill.indexOf(block);
          if(index === -1)
            return block;
        break;
    }

    return undefined;
  }
  
}
