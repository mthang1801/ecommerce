import React, {useState} from "react";
import {CategoryToggleContainer, CategoryLeft, Slash, CategoryMiddle, CategoryRight} from "./category-toggle.styles";
import Icon from "../../Custom/CustomIcon"
import { FaArrowDown, FaArrowUp} from "react-icons/fa"
import CategoryMenu from "../category-menu/category-menu.component";
const CategoryToggle = ({show, smallView, onMouseEnter, onMouseLeave, onClick}) => {  
  return (
    <CategoryToggleContainer onClick={onClick}  onMouseEnter={!smallView ? onMouseEnter : ()=>{}} onMouseLeave={!smallView ? onMouseLeave : ()=>{}}>    
      <CategoryLeft>
        <Slash />
        <Slash />
        <Slash />
      </CategoryLeft>
      <CategoryMiddle>Danh mục sản phẩm</CategoryMiddle>
      <CategoryRight>
        {show ?<Icon icon={<FaArrowUp/>} color="white" /> : <Icon icon={<FaArrowDown/>} color="white" /> }        
      </CategoryRight>
      {show && <CategoryMenu/>}
    </CategoryToggleContainer>
  );
};

export default CategoryToggle;
