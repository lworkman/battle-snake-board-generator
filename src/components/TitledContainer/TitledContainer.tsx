import React from "react";
import "./TitledContainer.css";

interface ITitledContainer {
  title: string;
}

export const TitledContainer: React.SFC<ITitledContainer> = ({ title, children }) => {
  return (
    <div>
      <div className="titled-container">
        <p className="container-title">{title}</p>
        {children}
      </div>
    </div>
  )
}