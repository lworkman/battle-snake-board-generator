import React from "react";
import "./ColourSquare.css";

export const ColourSquare: React.SFC<{ colour: string }> = ({ colour }) => <div className="colour-cell" style={{ backgroundColor: colour }} />