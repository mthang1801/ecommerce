import React, { useState, useCallback } from "react";
import {
  Wrapper,
  CategoryIcon,
} from "./styles/ButtonToggleCategoryBoard.styles";
import { FaCaretDown } from "react-icons/fa";
import useLanguage from "../Global/useLanguage"
const ButtonToggleCategoryBoard = ({active, ...props}) => {
  const {i18n, lang} = useLanguage();
  const {portfolioMenu} = i18n.store.data[lang].translation.navigations;
  return (
    <Wrapper role="button" tabIndex={0} aria-label="button" {...props} active={active}>
      <CategoryIcon active={active}>
        <span></span>
        <span></span>
        <span></span>
      </CategoryIcon>
      <div>
      {portfolioMenu} <FaCaretDown />
      </div>
    </Wrapper>
  );
};

export default ButtonToggleCategoryBoard;
