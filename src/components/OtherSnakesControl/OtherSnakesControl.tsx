import React from "react";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { SnakeControl } from "../SnakeControl/SnakeControl";
import { StyledButton } from "../StyledButton/StyledButton";
import { ICoordinate } from "../../types/ICoordinate.type";

export interface IOtherSnakesControl {
  selectSnake: (id: string) => void;
  snakes: {
    id: string;
    colour: string;
    body: ICoordinate[];
    health: string;
  }[];
  addSnake: () => void;
  changeSnakeHealth: (value: string, target: string) => void;
}

export const OtherSnakesControl: React.SFC<IOtherSnakesControl> = ({selectSnake, snakes, addSnake, changeSnakeHealth}) => (
  <TitledContainer title="Other Snakes">
    <div style={{ minHeight: "68px" }}>
      {snakes.map(snake =>
        <div key={snake.colour} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", margin: "5px" }}>
          <SnakeControl selectSnake={() => selectSnake(snake.id)} colour={snake.colour || ""} health={snake.health} title={snake.colour} changeHealth={(value) => changeSnakeHealth(value, snake.id)} />
        </div>
      )}
    </div>
    <StyledButton onClick={addSnake}>Add Snake</StyledButton>
  </TitledContainer>
)