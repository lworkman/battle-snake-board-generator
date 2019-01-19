export interface IBoardMove {
  move: PossibleMoves;
}

export type PossibleMoves = "up" | "down" | "left" | "right";