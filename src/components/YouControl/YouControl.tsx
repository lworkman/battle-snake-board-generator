import React from "react";
import { SnakeControl } from "../SnakeControl/SnakeControl";
import { TitledContainer } from "../TitledContainer/TitledContainer";

export interface IYouControl {
  selectYou: () => void;
  colour: string;
  health: string;
  changeHealth: (health: string) => void;
}

export const YouControl: React.SFC<IYouControl> = ({ selectYou, colour, health, changeHealth, }) => (
  <TitledContainer title="You">
    <SnakeControl selectSnake={selectYou} colour={colour} health={health} changeHealth={changeHealth} />
  </TitledContainer>
);