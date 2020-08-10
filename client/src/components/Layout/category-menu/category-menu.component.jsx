import React, { useState, useEffect, useRef, useContext } from "react";
import {
  CategoryMenuContainer,
  DropdownContent,
  CategoryList,
} from "./category-menu.styles";
import CATEGORY_DATA from "../../../data/category";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import ProductsPopup from "../products-popup/products-popup.component";
import AppContext from "../../../context/app-viewport.context";
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
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]);
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
              {ctgId && !smallView && (
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
