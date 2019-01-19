import React from "react";
import "./SnakeControl.css";
import { StyledInput } from "../StyledInput/StyledInput";
import { StyledButton } from "../StyledButton/StyledButton";
import { onChangeNumberLimitFactory } from "../../shared/utils";

export interface ISnakeControl {
  colour: string;
  health: string;
  selectSnake: () => void;
  changeHealth: (value: string) => void;
  title?: string;
}

export class SnakeControl extends React.Component<ISnakeControl, {}> {

  render() {

    const { colour, health, selectSnake, title, changeHealth } = this.props;

    return (
      <div className="snake-control-container">
        <StyledButton onClick={selectSnake}>
          <div className="colour-cell" style={{ backgroundColor: colour }}></div>
        </StyledButton>
        <div className="vertical-flex-container">
          <span>{colour}</span>
          <div>
            <StyledInput title="Health" value={health} onChange={onChangeNumberLimitFactory(changeHealth, 100)} />
          </div>
        </div>
      </div>
    )
  }
}
