import React, { useState, useEffect, useRef, useContext, memo } from "react";
import {
  CategoryMenuContainer,
  DropdownContent,
  CategoryList,
  CustomLink,
} from "./category-menu.styles";
import CATEGORY_MENU from "../../../data/menu.json";
import ProductsPopup from "../products-popup/products-popup.component";
import AppContext from "../../../context/app-viewport.context";
import { connect } from "react-redux";
import { selectCategoryList } from "../../../redux/category/category.selectors";
import { createStructuredSelector } from "reselect";
import DropdownMenu from "../dropdown-menu-content/dropdown-menu-content.component";
const CategoryMenu = ({}) => {
  const categoryList = Object.keys(CATEGORY_MENU).map(
    (key) => CATEGORY_MENU[key]
  );

  const [ctgId, setCtfId] = useState(null);
  const [offsetWidth, setOffsetWidth] = useState(0);
  const [touched, setIsTouched] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const categoryRef = useRef(null);
  const listRef = useRef(null);

  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
    setOffsetWidth(categoryRef.current.offsetWidth);
  }, [width]);

  useEffect(() => {
    function removePopupWhenMouseOutListCategory(e) {
      if (listRef && !listRef.current.contains(e.target)) {
        setCtfId(null);
        setIsTouched(false);
        setActiveLink(null);
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
    setActiveLink(categoryId);
  };

  return (
    <CategoryMenuContainer ref={categoryRef}>
      <CategoryList ref={listRef}>
        {categoryList.map((item) => (
          <React.Fragment key={item._id}>
            <DropdownMenu
              onMouseEnter={(e) => handleMouseEnter(e, item._id)}
              item={item}
              activeLink={activeLink}
            />

            <ProductsPopup
              offsetWidth={offsetWidth}
              categoryId={ctgId}
              data={CATEGORY_MENU[ctgId]}
            />
          </React.Fragment>
        ))}
      </CategoryList>
    </CategoryMenuContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  categoryList: selectCategoryList,
});
export default memo(connect(mapStateToProps)(CategoryMenu));
