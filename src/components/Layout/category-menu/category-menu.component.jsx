import React, { useState, useEffect, useRef } from "react";
import {
  CategoryMenuContainer,
  DropdownContent,
  CategoryList,
} from "./category-menu.styles";
import CATEGORY_DATA from "../../../data/category";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import ProductsPopup from "../products-popup/products-popup.component";
const CategoryMenu = ({ show }) => {
  const [ctgId, setCtfId] = useState(null);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [touched, setIsTouched] = useState(false);
  const categoryRef = useRef(null);
  const popUpRef = React.createRef(null);
  const listRef = useRef(null);
  const categoriesList = Object.keys(CATEGORY_DATA).map(
    (key) => CATEGORY_DATA[key]
  );
  useEffect(() => {
    setOffsetWidth(categoryRef.current.offsetWidth);
  }, [setOffsetWidth]);

  useEffect(() => {
    function removePopupWhenMouseOutListCategory(e) {
      if (listRef && !listRef.current.contains(e.target)) {
        setCtfId(null);
        setIsTouched(false);
      }
    }
    document.addEventListener("mouseover", removePopupWhenMouseOutListCategory);
    return () =>
      document.removeEventListener(
        "mouseover",
        removePopupWhenMouseOutListCategory
      );
  });

  const handleMouseEnter = (e, categoryId) => {
    setCtfId(categoryId);
    setIsTouched(true);
  };
  console.log(categoriesList);
  const handleMouseLeave = (e) => {};
  return (
    <CategoryMenuContainer ref={categoryRef}>
      <CategoryList ref={listRef}>
        {categoriesList.map((item) => (
          <React.Fragment key={item._id}>
            <CustomLink
              onMouseEnter={(e) => handleMouseEnter(e, item._id)}
              onMouseLeave={(e) => handleMouseLeave(e)}
              to={item.linkUrl}
              style={{ fontWeight: "400", textTransform: "capitalize" }}
            >
              {item.name}
            </CustomLink>
            <DropdownContent>
              {ctgId && (
                <ProductsPopup
                  ref={popUpRef}
                  offsetWidth={offsetWidth}
                  categoryId={ctgId}
                />
              )}
            </DropdownContent>
          </React.Fragment>
        ))}
      </CategoryList>
    </CategoryMenuContainer>
  );
};

export default CategoryMenu;
