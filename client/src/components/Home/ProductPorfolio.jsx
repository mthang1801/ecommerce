import React, { useState, useRef, useEffect, useContext } from "react";
import {
  CategoriesSliderContainer,
  Caption,
  CategoryItem,
  CategoryImage,
  CategoryName,
} from "./styles/ProductPorfolio.styles";
import Slider from "react-slick";
import {selectCategoryList } from "../../redux/home/home.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
import useLanguage from "../Global/useLanguage"
const CategoriesSlider = ({categoryList}) => {
  const {i18n, lang} = useLanguage()
  const {homePage} = i18n.store.data[lang].translation;
  const [slide, setSlide] = useState(null);
  let dragging = false;
  

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
      <CategoriesSliderContainer>
        <Caption>{homePage.productPorfolio}</Caption>
        {categoryList.length ? (
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
})
export default connect(mapStateToProps)(CategoriesSlider);
