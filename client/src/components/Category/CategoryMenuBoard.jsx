import React, { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper, TypesBoards } from "./styles/CategoryMenuBoard.styles";
import CategoryMenuItem from "./CategoryMenuItem";
import CategoryProductTypesBoard from "./CategoryProductTypesBoard";
import CATEGORY_MENU from "../../data/menu.json";
const categoryList = Object.keys(JSON.parse(JSON.stringify(CATEGORY_MENU))).map(
  (key) => CATEGORY_MENU[key]
);

const CategoryMenuBoard = ({ open }) => {
  const [activeId, setActiveId] = useState(null);
  const categoryRef = useRef(null);
  const onMouseEnterCategoryMenuItem = useCallback((_id) => {
    setActiveId(_id);
  });
  
  return (
    <Wrapper open={open} ref={categoryRef}>
      {categoryList.map((category) => (
        <CategoryMenuItem
          key={`category-${category._id}`}
          category={category}
          active={activeId===category._id}
          onMouseOver={onMouseEnterCategoryMenuItem}                              
        />
      ))}

      {activeId && (
        <TypesBoards>
          <CategoryProductTypesBoard data={CATEGORY_MENU[activeId]} />
        </TypesBoards>
      )}
    </Wrapper>
  );
};

export default CategoryMenuBoard;
