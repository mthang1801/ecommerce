import React, { useState, useRef, useEffect, useContext } from "react";
import {
  CategoriesSliderContainer,
  Caption,
 
} from "./styles/ProductPorfolio.styles";
import Slider from "react-slick";
import { selectHomePortfolios } from "../../redux/home/home.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import useLanguage from "../Global/useLanguage";
import PortfolioItem from "./PortfolioItem"
import {CustomPortfoliosArrowNext, CustomPortfoliosArrowPrev} from "../Custom/CustomArrowSlider"
const CategoriesSlider = ({ portfolios }) => {
  const { i18n, lang } = useLanguage();
  const { homePage } = i18n.store.data[lang].translation;
  const [slide, setSlide] = useState(null);
  let dragging = false;

  const slideRef = useRef(null);
  useEffect(() => {
    setSlide(slideRef.current);
  }, [slideRef]);
  const settings = {        
    infinite: true, 
    slidesToShow: window.innerWidth < 600 ? 3 : window.innerWidth < 992 ? 4 :  5,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    autoPlay : true,
    prevArrow : <CustomPortfoliosArrowPrev/>,
    nextArrow : <CustomPortfoliosArrowNext/>
  };
  if (!portfolios.length) return null;
  return (
    <CategoriesSliderContainer>
      <Caption>{homePage.productPorfolio}</Caption>
      {
        <Slider {...settings}
          beforeChange={() => (dragging = true)}
          afterChange={() => (dragging = false)}
          autoplaySpeed={2000}
        >
          {portfolios.map((portfolio) => (
            <PortfolioItem key={`home-${portfolio._id}`} portfolio={portfolio} />
          ))}
        </Slider>
      }
      {/* {categoryList.length ? (
          <Slider
            asNavFor={slide}
            ref={slideRef}
            slidesToShow={window.innerWidth < 600 ? 1 :window.innerWidth < 992 ? 2:  4}
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
                    key={item._id}
                    to={`/category/${item._id}`}
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
        ) : null} */}
    </CategoriesSliderContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  portfolios: selectHomePortfolios,
});
export default connect(mapStateToProps)(CategoriesSlider);
