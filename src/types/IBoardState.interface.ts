import { ICoordinate } from "./ICoordinate.type";
import { ISnake } from "./ISnake.interface";

export interface IBoardState {
  board: {
    food: ICoordinate[];
    height: number;
    snakes: ISnake[]
    width: number;
  };
  game: {
    id: string;
  };
  turn: number;
  you: ISnake;
}