import React, {useState} from 'react'
import {CategoryOverViewContainer, Header, Body} from "./category-overview.styles";
import CategoryToggle from "../category-toggle/category-toggle.component";
import CategoryMenu from "../category-menu/category-menu.component";
const CategoryOverView = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <CategoryOverViewContainer>      
      <Header>
        <CategoryToggle show={toggle} onClick={() => setToggle(!toggle)} />
      </Header>
      <Body>
        <CategoryMenu show={toggle}/>
      </Body>      
    </CategoryOverViewContainer>
  )
}

export default CategoryOverView
