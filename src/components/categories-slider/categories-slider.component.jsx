import React, { useState, useRef, useEffect } from "react";
import { CategoriesSliderContainer, Caption, CategoryItem, CategoryImage, CategoryName} from "./categories-slider.styles";
import categoriesData from "../../data/category";
import Slider from "react-slick";
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
  const slideRef = useRef(null);
  useEffect(() => {  
    setSlide(slideRef.current)
  }, [slideRef])
  

    return (
      <CategoriesSliderContainer>
       <Caption>Danh mục sản phẩm</Caption>
        <Slider
          asNavFor={slide}
          ref={slideRef}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}        
          autoplay
          pauseOnHover={false}
          autoplaySpeed={2000}
        >
          {categoriesGroup.map(group => 
            group.map(item =>(
              <CategoryItem key={item.id}>
                <CategoryImage src={require(`../../assets/img/categories/${item.imageUrl}`)}/>
                <CategoryName>{item.name}</CategoryName>              
              </CategoryItem>              
            ))
          )}
        </Slider>
     
      </CategoriesSliderContainer>
    );
  
}

export default CategoriesSlider;
