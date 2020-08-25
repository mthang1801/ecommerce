import React, {useState} from "react";
import {CategoryToggleContainer, CategoryLeft, Slash, CategoryMiddle, CategoryRight} from "./category-toggle.styles";
import Icon from "../../UI/custom-icon/custom-icon.component"
import { FaArrowDown, FaArrowUp} from "react-icons/fa"
import CategoryMenu from "../category-menu/category-menu.component";
const CategoryToggle = ({show, onMouseEnter, onMouseLeave}) => {
 
  return (
    <CategoryToggleContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    
      <CategoryLeft>
        <Slash />
        <Slash />
        <Slash />
      </CategoryLeft>
      <CategoryMiddle>All department</CategoryMiddle>
      <CategoryRight>
        {show ?<Icon icon={<FaArrowUp/>} color="white" /> : <Icon icon={<FaArrowDown/>} color="white" /> }        
      </CategoryRight>
      {show && <CategoryMenu/>}
    </CategoryToggleContainer>
  );
};

export default CategoryToggle;
