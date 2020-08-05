import React from "react";
import {CategoryToggleContainer, CategoryLeft, Slash, CategoryMiddle, CategoryRight} from "./category-toggle.styles";
import Icon from "../../UI/custom-icon/custom-icon.component"
import { FaArrowDown, FaArrowUp} from "react-icons/fa"
const CategoryToggle = ({show, onClick}) => {
  return (
    <CategoryToggleContainer onClick={onClick}>
      <CategoryLeft>
        <Slash />
        <Slash />
        <Slash />
      </CategoryLeft>
      <CategoryMiddle>All department</CategoryMiddle>
      <CategoryRight>
        {show ?<Icon icon={<FaArrowUp/>} color="white" /> : <Icon icon={<FaArrowDown/>} color="white" /> }        
      </CategoryRight>
    </CategoryToggleContainer>
  );
};

export default CategoryToggle;
