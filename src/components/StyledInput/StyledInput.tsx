import React from "react";
import "./StyledInput.css";

export const StyledInput: React.SFC<React.InputHTMLAttributes<HTMLInputElement>> = props => {
  return <div className="styled-input">
    {props.title && <span className="input-title">{props.title}:</span>}
    <input type="text" {...props} />
  </div>
}