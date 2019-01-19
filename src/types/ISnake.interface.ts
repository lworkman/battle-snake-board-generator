import { ICoordinate } from "./ICoordinate.type";

export interface ISnake {
  body: ICoordinate[];
  health: number;
  id: string;
  name: string;
}