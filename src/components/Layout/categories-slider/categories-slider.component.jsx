import React, { useState, useRef, useEffect, useContext } from "react";
import { CategoriesSliderContainer, Caption, CategoryItem, CategoryImage, CategoryName} from "./categories-slider.styles";
import categoriesData from "../../../data/category";
import Slider from "react-slick";
import AppContext from "../../../context/app-viewport.context";
const categoryItems = Object.keys(categoriesData).map(
  (key) => categoriesData[key]
);

let categoriesGroup = [];
let categoriesPerPage = [];
categoryItems.forEach((item, index) => {
  if (index !== 0 && index % 4 === 0) {
    categoriesGroup.push(categoriesPerPage);
    categoriesPerPage = [];
  }
  categoriesPerPage.push(item);
  if (index === categoryItems.length - 1 && index % 4 !== 0) {
    categoriesGroup.push(categoriesPerPage);
  }
});


const CategoriesSlider = (props) => {
  const [slide, setSlide] = useState(null)
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
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
    setSlide(slideRef.current)
  }, [slideRef])
    return (
      <CategoriesSliderContainer mobileView={mobileView}>
       <Caption>Danh mục sản phẩm</Caption>
        <Slider
          asNavFor={slide}
          ref={slideRef}
          slidesToShow={mobileView ? 2 : tabletView ? 3 : 4}
          swipeToSlide={true}
          focusOnSelect={true}        
          autoplay
          pauseOnHover={false}
          autoplaySpeed={2000}
        >
          {categoriesGroup.map(group => 
            group.map(item =>(
              <CategoryItem key={item.id}>
                <CategoryImage src={require(`../../../assets/img/categories/${item.imageUrl}`)}/>
                <CategoryName>{item.name}</CategoryName>              
              </CategoryItem>              
            ))
          )}
        </Slider>
     
      </CategoriesSliderContainer>
    );
  
}

export default CategoriesSlider;
