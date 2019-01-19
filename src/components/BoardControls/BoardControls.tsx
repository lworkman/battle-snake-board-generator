import React from "react";
import { IBoardState } from "../../types/IBoardState.interface";
import { StyledInput } from "../StyledInput/StyledInput";
import { onChangeNumberLimitFactory } from "../../shared/utils";
import { StyledButton } from "../StyledButton/StyledButton";
import { CenteredRow } from "../CenteredRow/CenteredRow";

export interface IBoardControls {
  height: string;
  width: string;
  changeHeight: (value: string) => void;
  changeWidth: (value: string) => void;
  uploadBoard: (value: IBoardState) => void;
  boardState: IBoardState;
}

export const BoardControls: React.SFC<IBoardControls> = ({ height, width, changeHeight, changeWidth, uploadBoard, boardState }) => {

  let boardCopyInput: HTMLInputElement | null;
  let boardString: string = JSON.stringify(boardState);

  const copyBoardState = () => {
    if (!boardCopyInput) {
      return;
    }
    boardCopyInput.select();
    document.execCommand("copy");
  }

  return (
    <>
      <CenteredRow>
        <StyledInput title="Height" value={height} onChange={onChangeNumberLimitFactory(changeHeight)} />
        <StyledInput title="Width" value={width} onChange={onChangeNumberLimitFactory(changeWidth)} />
      </CenteredRow>
      <CenteredRow>
        <StyledInput placeholder="Past Board Here" />
        <StyledButton>Upload</StyledButton>
      </CenteredRow>
      <CenteredRow>
        <StyledButton onClick={copyBoardState}>Copy Board State</StyledButton>
        <input ref={ref => boardCopyInput = ref} type="text" readOnly value={boardString} style={{ position: "absolute", top: -10000 }} />
        <StyledButton href={"data:text/json;charset=utf-8," + encodeURIComponent(boardString)} download={`board-${boardState.game.id}.json`}>Download Board State</StyledButton>
      </CenteredRow>
    </>
  )
}
