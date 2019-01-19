import React from "react";
import "./CellComponent.css";

export interface ICell {
  onChange?: () => void;
  colour?: string;
  isHead?: boolean
}

export const CellComponent: React.SFC<ICell> = ({ colour, onChange, isHead }) => (
  <div className="cell" style={{ backgroundColor: colour ? colour : "#d4d4d4" }} onClick={onChange}>
    <span>{isHead && "*"}</span>
  </div>
);