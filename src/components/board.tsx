import React from "react";
import { IBoardState } from "../types/IBoardState.interface";
import { ISnake } from "../types/ISnake.interface";
import { CellComponent } from "./CellComponent";

export interface IBoard {
  boardState: IBoardState,
  onChange: (x: number, y: number) => void;
}

export const Board = ({ boardState, onChange }: IBoard) => (
  <div>
    {generateBoard(boardState, onChange).map((column, index) => <div key={index}>{column.map(element => element)}</div>)}
  </div>
)

const generateBoard = (boardState: IBoardState, onChange: (x: number, y: number) => void) => {
  const output: JSX.Element[][] = [];
  const boardWithSnakes: {
    colour: string;
    isHead: boolean;
  }[][] = [];
  boardState.board.snakes.concat(boardState.you).forEach(snake => {
    snake.body.forEach((segment, index) => {
      if (!boardWithSnakes[segment.x]) {
        boardWithSnakes[segment.x] = [];
      }
      boardWithSnakes[segment.x][segment.y] = {
        colour: snake.name,
        isHead: index === 0
      };
    })
  })

  for (let y = 0; y < boardState.board.height; y++) {
    output.push([]);
    for (let x = 0; x < boardState.board.width; x++) {
      let snakePiece: {
        colour: string;
        isHead: boolean;
      } | undefined = boardWithSnakes[x] && boardWithSnakes[x][y] ? boardWithSnakes[x][y] : undefined;

      if (boardState.board.food.some(food => food.x === x && food.y === y)) {
        output[y].push(<CellComponent key={`${x},${y}`} colour="orange" onChange={() => onChange(x, y)} />)
      } else if (snakePiece) {
        output[y].push(<CellComponent key={`${x},${y}`} colour={snakePiece.colour} isHead={snakePiece.isHead} onChange={() => onChange(x, y)} />)
      } else {
        output[y].push(<CellComponent key={`${x},${y}`} colour="transparent" onChange={() => onChange(x, y)} />)
      }
    }
  }
  return output;
}