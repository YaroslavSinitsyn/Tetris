import { Figure } from 'app/share/figure';

export enum TypeFigure {
    Tring = 0,
    LetetL,
    Block,
    Line,
    Four
}
export const figureDate:Figure[] = [
    {
        block1:'1.4', 
        block2:'0.3', //###
        block3:'0.4', // #
        block4:'0.5',
        type:TypeFigure.Tring
    },
    {
        block1:'1.5', // #
        block2:'1.4', //###
        block3:'1.3',
        block4:'0.4',
        type:TypeFigure.Tring
    },
    {
        block1:'2.4', //#
        block2:'1.4', //##
        block3:'0.4', //#
        block4:'1.5',
        type:TypeFigure.Tring
    },
    {
      block1:'2.4',// #
      block2:'1.4',//##
      block3:'0.4',// #
      block4:'1.3',
      type:TypeFigure.Tring
    },
    {
        block1:'2.5',//#
        block2:'2.4',//#
        block3:'1.4',//##
        block4:'0.4',
        type:TypeFigure.LetetL
    },
    {
        block1:'2.4',// #
        block2:'2.3',// #
        block3:'1.4',//##
        block4:'0.4',
        type:TypeFigure.LetetL
    },
    {
        block1:'1.5',//###
        block2:'0.3',//  #
        block3:'0.4',
        block4:'0.5',
        type:TypeFigure.LetetL
    },
    {
        block1:'1.5',//  #
        block2:'1.4',//###
        block3:'1.3',
        block4:'0.5',
        type:TypeFigure.LetetL
    },
    {
        block1:'1.5',//#
        block2:'1.4',//###
        block3:'1.3',
        block4:'0.3',
        type:TypeFigure.LetetL
    },
    {
        block1:'1.3',
        block2:'0.5',//###
        block3:'0.4',//#
        block4:'0.3',
        type:TypeFigure.LetetL
    },
    {
        block1:'2.4',//##
        block2:'1.4',// #
        block3:'0.4',// #
        block4:'0.3',
        type:TypeFigure.LetetL
    },
    {
        block1:'2.4',//##
        block2:'1.4',//#
        block3:'0.4',//#
        block4:'0.5',
        type:TypeFigure.LetetL
    },
    {
        block1:'1.4',//##
        block2:'1.5',//##
        block3:'0.4',
        block4:'0.5',
        type:TypeFigure.Block
    },
    {
        block1:'3.4',// #
        block2:'2.4',// #
        block3:'1.4',// #
        block4:'0.4',// #
        type:TypeFigure.Line
    },
    {
        block1:'0.6',// ####
        block2:'0.5',
        block3:'0.4',
        block4:'0.3',
        type:TypeFigure.Line
    },
    {
        block1:'2.5',// #
        block2:'1.5',// ##
        block3:'1.4',//  #
        block4:'0.4', // 
        type:TypeFigure.Four
    },
    {
        block1:'0.5',//  #
        block2:'1.5',// ##
        block3:'1.4',// #
        block4:'2.4',//
        type:TypeFigure.Four 
    },
    {
        block1:'1.4',//  ##
        block2:'1.3',// ##
        block3:'0.4',//  
        block4:'0.5', //
        type:TypeFigure.Four 
    },
    {
        block1:'1.5',//  ##
        block2:'1.4',//   ##
        block3:'0.4',//  
        block4:'0.3', //
        type:TypeFigure.Four 
    }
];