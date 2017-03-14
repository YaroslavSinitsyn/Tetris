import { Figure } from 'app/share/figure';

export enum TypeFigure {
    T, L, Q, I, Z, S, J
}
export const figureDate:Figure[] = [
    {
        block1:'1.4', 
        block2:'0.3', //###
        block3:'0.4', // #
        block4:'0.5',
        type:TypeFigure.T
    },
    {
        block1:'1.5', // #
        block2:'1.4', //###
        block3:'1.3',
        block4:'0.4',
        type:TypeFigure.T
    },
    {
        block1:'2.4', //#
        block2:'1.4', //##
        block3:'0.4', //#
        block4:'1.5',
        type:TypeFigure.T
    },
    {
      block1:'2.4',// #
      block2:'1.4',//##
      block3:'0.4',// #
      block4:'1.3',
      type:TypeFigure.T
    },
    {
        block1:'2.5',//#
        block2:'2.4',//#
        block3:'1.4',//##
        block4:'0.4',
        type:TypeFigure.L
    },
    {
        block1:'1.3',
        block2:'0.5',//###
        block3:'0.4',//#
        block4:'0.3',
        type:TypeFigure.L
    },
    {
        block1:'2.4',//##
        block2:'1.4',// #
        block3:'0.4',// #
        block4:'0.3',
        type:TypeFigure.L
    },
    {
        block1:'1.5',//  #
        block2:'1.4',//###
        block3:'1.3',
        block4:'0.5',
        type:TypeFigure.L
    },
    {
        block1:'2.4',// #
        block2:'2.3',// #
        block3:'1.4',//##
        block4:'0.4',
        type:TypeFigure.J
    },
    {
        block1:'1.5',//#
        block2:'1.4',//###
        block3:'1.3',
        block4:'0.3',
        type:TypeFigure.J
    },
    {
        block1:'0.4',  //##
        block2:'1.4',  //#
        block3:'2.4',  //#
        block4:'0.5',  //#
        type:TypeFigure.J
    },
    {
        block1:'1.8',//###
        block2:'0.6',//  #
        block3:'0.7',
        block4:'0.8',
        type:TypeFigure.J
    },
    {
        block1:'1.4',//##
        block2:'1.5',//##
        block3:'0.4',
        block4:'0.5',
        type:TypeFigure.Q
    },
    {
        block1:'3.4',// #
        block2:'2.4',// #
        block3:'1.4',// #
        block4:'0.4',// #
        type:TypeFigure.I
    },
    {
        block1:'0.6',// ####
        block2:'0.5',
        block3:'0.4',
        block4:'0.3',
        type:TypeFigure.I
    },
    
    {
        block1:'2.5',// #
        block2:'1.5',// ##
        block3:'1.4',//  #
        block4:'0.4', // 
        type:TypeFigure.S
    },
    {
        block1:'1.7',//  ##
        block2:'1.6',// ##
        block3:'0.7',//  
        block4:'0.8', //
        type:TypeFigure.S
    },
    {
        block1:'0.5',//  #
        block2:'1.5',// ##
        block3:'1.4',// #
        block4:'2.4',//
        type:TypeFigure.Z 
    },
    {
        block1:'1.5',//  ##
        block2:'1.4',//   ##
        block3:'0.7',//  
        block4:'0.6', //
        type:TypeFigure.Z
    },
    
];