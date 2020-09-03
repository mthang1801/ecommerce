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
import { getCategoryList } from "../../../utils/connectDB";

const CategoriesSlider = (props) => {
  const [slide, setSlide] = useState(null);
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  const [category, setCategory] = useState([]);
  let dragging = false;
  useEffect(() => {
    let _mounted = true;
    getCategoryList().then((data) => {
      if (_mounted) {
        setCategory(data);
      }
    });
    return () => (_mounted = false);
  }, [getCategoryList]);

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
  category.forEach((item, index) => {
    if (index !== 0 && index % 4 === 0) {
      categoriesGroup.push(categoriesPerPage);
      categoriesPerPage = [];
    }
    categoriesPerPage.push(item);
    if (index === category.length - 1 && index % 4 !== 0) {
      categoriesGroup.push(categoriesPerPage);
    }
  });
  return (
    <React.Fragment>
      <CategoriesSliderContainer mobileView={mobileView}>
        <Caption>Danh mục sản phẩm</Caption>
        {category.length ? (
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
        ) : <h4>Đang tải...</h4>}
      </CategoriesSliderContainer>
    </React.Fragment>
  );
};

export default CategoriesSlider;
