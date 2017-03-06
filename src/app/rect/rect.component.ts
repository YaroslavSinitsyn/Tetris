import { Component, HostListener } from '@angular/core';
import { Figure } from '../share/figure';
import { figureDate } from '../share/figureData'

class Rect {
    constructor(public id:string ='0.0', public x:number=1, public y:number=1, public width:number=25, public height:number=25){}
}

@Component({
    moduleId:module.id,
    selector:'rect-comp',
    templateUrl: 'rect.component.html',
    styleUrls:['rect.component.css']
})
export class RectComponent {
    gridArray:Rect[];
    rowMax:number = 20;
    columnMax:number = 10;
    count:number = 0;
    interval;
    itervalMove;
    currentFigure:Figure;
    lastFigure:Figure;
    arrayBlockFill:string[] = new Array<string>();
    arrayFill:string[] = new Array<string>();
    arrFigur:Figure[] = new Array<Figure>(); 
    flag:boolean;
    leftCode:number = 37;
    upCode:number = 38;
    rightCode:number = 39;
    downCode:number = 40;

    constructor(){
        this.gridArray = this.gridData();
        this.flag = true;

        this.start();

    }
    
    start():void {
      this.itervalMove = setInterval(()=>{
          if(this.flag){
            this.createFigure();
          }
          this.runFigure();
          if(!this.flag)
            this.clearFigure(this.lastFigure);

          this.showFigure(this.currentFigure);
        }, 1000);
    }

    stop():void {
      clearInterval(this.itervalMove);
    }
    moveLeft():void {
      this.stop();
      let newFigure:Figure = new Figure();
      let flagExit:boolean = false;
      
      for(let block in this.currentFigure) {
        if(block.toString() !== 'type'){
          let arrayRowColumn:string[] = this.currentFigure[block].split('.');
          let column:number = parseInt(arrayRowColumn[1]);

          if(column - 1 < 0)
              flagExit = true;
        }
          
      }

      if(!flagExit) {
        for(let block in this.currentFigure) {
          if(block.toString() !== 'type') {
            let arrayRowColumn:string[] = this.currentFigure[block].split('.');
            let row:number = parseInt(arrayRowColumn[0]);
            let column:number = parseInt(arrayRowColumn[1]);
          
            let strP = `${row}.${column - 1}`
            
            newFigure[block] = strP;
          }
      }
      
      this.clearFigure(this.currentFigure);
      
      this.currentFigure= newFigure;
      this.lastFigure = this.currentFigure;
      this.showFigure(this.currentFigure);
      }
      this.start();
    }
    moveRight():void {
      this.stop();
      let newFigure:Figure = new Figure();
      let flagExit:boolean = false;
      
      for(let block in this.currentFigure) {

        if(block.toString() !== 'type'){
          let arrayRowColumn:string[] = this.currentFigure[block].split('.');
          let column:number = parseInt(arrayRowColumn[1]);

          if(column + 1 >= this.columnMax)
              flagExit = true;
        }
          
      }

      if(!flagExit) {
        for(let block in this.currentFigure) { 
        
          if(block.toString() !== 'type') {
            let arrayRowColumn:string[] = this.currentFigure[block].split('.');
          let row:number = parseInt(arrayRowColumn[0]);
          let column:number = parseInt(arrayRowColumn[1]);
          
          let strP = `${row}.${column + 1}`
            
          newFigure[block] = strP;
        }
        
      }
      
      this.clearFigure(this.currentFigure);
      
      this.currentFigure= newFigure;
      this.lastFigure = this.currentFigure;
      this.showFigure(this.currentFigure);
      }
      this.start();
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
      
      switch(event.keyCode) {
        case this.leftCode:
            this.moveLeft()
          break;
        case this.rightCode:
            this.moveRight();
          break;
        case this.upCode:
          break;
        case this.downCode:
          break;
        default:
          break;
      }
      
      
    }

    gridData():Rect[] {
      let data:Rect[] = new Array<Rect>();
      let rect:Rect = new Rect();

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

    clearFigure(figure:Figure):void {
      for(let block in figure) {
          let index:number = this.arrayBlockFill.indexOf(figure[block])
          if(index === -1 && block.toString() !== 'type')
            document.getElementById(figure[block]).setAttribute("fill", "#fff");
        }
    }

    showFigure(figure:Figure):void {
      for(let t in figure) {
          if(t.toString() !== 'type')
            document.getElementById(figure[t]).setAttribute("fill", "#2C93E8");
      }
    } 

    createFigure():void {
      
      if(this.lastFigure === null) {
        this.currentFigure = figureDate[this.count];
        this.lastFigure = figureDate[this.count];
        this.showFigure(this.currentFigure);
      }
      else{
          this.currentFigure = figureDate[this.count];
          this.clearFigure(this.lastFigure);
          this.showFigure(this.currentFigure);
          this.lastFigure = this.currentFigure;
      }
    
      this.count++;
    }

    runFigure() {
      this.flag = false;
      let newFigure:Figure = new Figure();
      for(let block in this.currentFigure) {
          if(block.toString() !== 'type') {
            let arrayRowColumn:string[] = this.currentFigure[block].split('.');
            let row:number = parseInt(arrayRowColumn[0]);
            let column:number = parseInt(arrayRowColumn[1]);
          
            let strP = `${row + 1}.${column}`
            let index = this.arrayBlockFill.indexOf(strP);

            if((row >= (this.rowMax - 1) ) || index !== -1)  {
              this.flag = true;
            }
            else if(!this.flag) {
              newFigure[block] = `${row+1}.${column}`;
            }

            if(this.flag)
              this.arrayBlockFill.push(this.currentFigure[block]);
            }
                    
      }

      if(!this.flag) {
        this.lastFigure = this.currentFigure;
        this.currentFigure = newFigure;
      }
    
    }



}