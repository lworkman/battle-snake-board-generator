import React from "react";
import { TitledContainer } from "../TitledContainer/TitledContainer";
import { CenteredRow } from "../CenteredRow/CenteredRow";
import { StyledButton } from "../StyledButton/StyledButton";
import { ColourSquare } from "../ColourSquare/ColourSquare";

export const FoodControl: React.SFC<{ selectFood: () => void, foodCount: number }> = ({selectFood, foodCount }) => (

  <TitledContainer title="Food">
    <CenteredRow>
      <StyledButton onClick={selectFood}>
        <ColourSquare colour="orange" />
      </StyledButton>
      <span>Food Count: {foodCount}</span>
    </CenteredRow>
  </TitledContainer>
)