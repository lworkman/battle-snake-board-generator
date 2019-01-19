import React from "react";


export interface ICell {
  onChange?: () => void;
  colour: string;
  isHead?: boolean
}

export const CellComponent: React.SFC<ICell> = ({ colour, onChange, isHead }) => (
  <div style={{ height: "15px", width: "15px", backgroundColor: colour, margin: "2.5px", border: "1px solid black", display:"inline-block" }} onClick={onChange}>
  {isHead && "H"}
  </div>
);