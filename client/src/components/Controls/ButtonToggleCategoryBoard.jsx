import React, { useState, useCallback } from "react";
import {
  Wrapper,
  CategoryIcon,
} from "./styles/ButtonToggleCategoryBoard.styles";
import { FaCaretDown } from "react-icons/fa";

const ButtonToggleCategoryBoard = ({active, ...props}) => {
  return (
    <Wrapper role="button" tabIndex={0} aria-label="button" {...props} active={active}>
      <CategoryIcon active={active}>
        <span></span>
        <span></span>
        <span></span>
      </CategoryIcon>
      <div>
        Category <FaCaretDown />
      </div>
    </Wrapper>
  );
};

export default ButtonToggleCategoryBoard;
