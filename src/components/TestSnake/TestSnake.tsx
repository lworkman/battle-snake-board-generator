import React from "react";
import { IBoardState } from "../../types/IBoardState.interface";
import { StyledButton } from "../StyledButton/StyledButton";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { StyledInput } from "../StyledInput/StyledInput";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { IBoardMove } from "../../types/IBoardMove";

export interface ITestSnakeProps {
  boardState: IBoardState;
}

interface ITestSnakeState {
  url: string;
  response?: string;
}

export class TestSnake extends React.Component<ITestSnakeProps, ITestSnakeState> {

  constructor(props: ITestSnakeProps) {
    super(props);

    this.state = {
      url: "http://localhost:5000"
    }
  }


  public sendBoard = () => {

    const { boardState } = this.props;

    fetch("http://localhost:5000/move", {
      body: JSON.stringify(boardState),
      method: "POST",
      headers: [
        ["content-type", "application/json"]
      ]
    }).then(res => res.json()).then((move: IBoardMove) => this.setState({ response: move.move }));
  }

  public render() {

    const { response, url } = this.state;

    return (
      <TitledContainer title="Test Snake">
        <CenteredRow>
          <StyledInput title="URL" value={url} onChange={event => this.setState({ url: event.target.value })} />
          {response && <span>Move: {response}</span>}
        </CenteredRow>
        <CenteredRow>
          <StyledButton onClick={this.sendBoard}>Ping Snake</StyledButton>
        </CenteredRow>
      </TitledContainer>
    )
  }

}