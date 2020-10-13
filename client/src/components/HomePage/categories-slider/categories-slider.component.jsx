import React, { useState, useRef, useEffect, useContext } from "react";
import {
  CategoriesSliderContainer,
  Caption,
  CategoryItem,
  CategoryImage,
  CategoryName,
} from "./categories-slider.styles";
import Slider from "react-slick";
import AppContext from "../../../context/app-viewport.context";
import {selectCategoryList , selectHomeIsLoading} from "../../../redux/home/home.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
const CategoriesSlider = ({categoryList, isLoading}) => {
  const [slide, setSlide] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  let dragging = false;


  useEffect(() => {
    if (width < 600) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  const slideRef = useRef(null);
  useEffect(() => {
    setSlide(slideRef.current);
  }, [slideRef]);

  let categoriesGroup = [];
  let categoriesPerPage = [];
  categoryList.forEach((item, index) => {
    if (index !== 0 && index % 4 === 0) {
      categoriesGroup.push(categoriesPerPage);
      categoriesPerPage = [];
    }
    categoriesPerPage.push(item);
    if (index === categoryList.length - 1 && index % 4 !== 0) {
      categoriesGroup.push(categoriesPerPage);
    }
  });
  return (   
      <CategoriesSliderContainer mobileView={mobileView}>
        <Caption>Danh mục sản phẩm</Caption>
        {categoryList.length ? (
          <Slider
            asNavFor={slide}
            ref={slideRef}
            slidesToShow={mobileView ? 2 : tabletView ? 3 : 4}
            swipeToSlide={true}
            focusOnSelect={false}
            autoplay
            pauseOnHover={false}
            autoplaySpeed={2000}
            beforeChange={() => (dragging = true)}
            afterChange={() => (dragging = false)}
          >
            {categoriesGroup.map((group) =>
              group.map((item) => {
                return (
                  <CategoryItem
                    key={item.id}
                    to={item.linkUrl}
                    onClick={(e) => dragging && e.preventDefault()}
                  >
                    <CategoryImage
                      src={`data:${item.imageUrl.mimetype};base64,${item.imageUrl.data}`}
                    />
                    <CategoryName>{item.name}</CategoryName>
                  </CategoryItem>
                );
              })
            )}
          </Slider>
        ) : null}
      </CategoriesSliderContainer>  
  );
};
const mapStateToProps = createStructuredSelector({
  categoryList : selectCategoryList,
  isLoading : selectHomeIsLoading
})
export default connect(mapStateToProps)(CategoriesSlider);
