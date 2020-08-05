import React, { useState } from "react";
import { CategoryOverViewContainer } from "./category-overview.styles";
import CategoryToggle from "../category-toggle/category-toggle.component";
import CategoryMenu from "../category-menu/category-menu.component";
const CategoryOverView = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <CategoryOverViewContainer>
      <CategoryToggle show={toggle} onClick={() => setToggle(!toggle)} />
      {toggle && <CategoryMenu />}
    </CategoryOverViewContainer>
  );
};

export default CategoryOverView;
