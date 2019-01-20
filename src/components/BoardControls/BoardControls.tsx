import React from "react";
import { StyledInput } from "../StyledInput/StyledInput";
import { onChangeNumberLimitFactory, onBlurSetMinimumFactory } from "../../shared/utils";
import { StyledButton } from "../StyledButton/StyledButton";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { IBoardState } from "../../types/IBoardState.interface";

export interface IBoardControls {
  height: string;
  width: string;
  changeHeight: (value: string) => void;
  changeWidth: (value: string) => void;
  uploadBoard: (value: string) => void;
  boardState: IBoardState;
}

interface IBoardControlsState {
  boardUploadString: string;
}

export class BoardControls extends React.Component<IBoardControls, IBoardControlsState> {

  private boardCopyInput: HTMLInputElement | null = null;

  constructor(props: IBoardControls) {
    super(props);
    this.state = {
      boardUploadString: ""
    }
  }

  public copyBoardState = () => {
    if (!this.boardCopyInput) {
      return;
    }
    this.boardCopyInput.select();
    document.execCommand("copy");
  }

  public uploadBoardState = () => {
    const { boardUploadString } = this.state;
    const { uploadBoard } = this.props;
    uploadBoard(boardUploadString);
  }

  public setBoardString = (value: string) => this.setState({ boardUploadString: value });

  render() {
    const { height, width, changeHeight, changeWidth, uploadBoard, boardState } = this.props;
    const boardString: string = JSON.stringify(boardState);
    return (
      <TitledContainer title="Board">
        <CenteredRow>
          <StyledInput title="Height" value={height} onBlur={onBlurSetMinimumFactory(changeHeight, 1)} onChange={onChangeNumberLimitFactory(changeHeight)} />
          <StyledInput title="Width" value={width} onBlur={onBlurSetMinimumFactory(changeWidth, 1)} onChange={onChangeNumberLimitFactory(changeWidth)} />
        </CenteredRow>
        <CenteredRow>
          <StyledInput placeholder="Past Board Here" onChange={event => this.setBoardString(event.target.value)} />
          <StyledButton onClick={this.uploadBoardState}>Upload</StyledButton>
        </CenteredRow>
        <CenteredRow>
          <StyledButton onClick={this.copyBoardState}>Copy Board State</StyledButton>
          <input tabIndex={-1} ref={ref => this.boardCopyInput = ref} type="text" readOnly value={boardString} style={{ position: "absolute", top: -10000 }} />
          <StyledButton href={"data:text/json;charset=utf-8," + encodeURIComponent(boardString)} download={`board-${boardState.game.id}.json`}>Download Board State</StyledButton>
        </CenteredRow>
      </TitledContainer>
    )

  }
}
