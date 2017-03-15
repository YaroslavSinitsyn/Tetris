import { Injectable } from '@angular/core';

import { Rectangle } from '../share/rectangle';
import { Figure } from '../share/figure';
import { figureDate } from '../share/figureData';

@Injectable()
export class RectService {
  nextFigureIndex:number;
  createGrid(rowMax, columnMax): Rectangle[] {
    let data: Rectangle[] = new Array<Rectangle>();
    let rectangle: Rectangle = new Rectangle()
    for (var row = 0; row < rowMax; row++) {
      for (var column = 0; column < columnMax; column++) {
        rectangle.id = `${row}.${column}`;
        data.push(new Rectangle(rectangle.id, rectangle.x, rectangle.y, rectangle.width, rectangle.height));
        rectangle.x += rectangle.width;
      }
      rectangle.x = 1;
      rectangle.y += rectangle.height
    }

      return data;
  }


  createFigure(numFigure:number):[Figure[], number] {
    let currentFigure:Figure = figureDate[numFigure];
    let currentFigureArray:Figure[] = new Array<Figure>();
    currentFigureArray = figureDate.filter(item => {
      if(item.type === currentFigure.type)
        return item;
    });
    let index = currentFigureArray.indexOf(currentFigure);
    return [currentFigureArray, index];
  }

}

