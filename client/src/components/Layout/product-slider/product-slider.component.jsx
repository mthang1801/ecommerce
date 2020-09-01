import React from "react";
import { ProductSliderWrapper, Title } from "./product-slider.styles";
import Slider from "react-slick";
import ProductItem from "../../UI/product-item/product-item.component";

const ProductSlider = ({ mobileView, tabletView, productList, title, showNumber }) => {
  const settings = {
    infinite: true,
    slidesToShow: mobileView || tabletView ? 1 : 3,
    slidesToScroll: 2,
    autoplay: true,
    centerPadding: mobileView ? "10px" : tabletView ? "25px" : "auto",
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: mobileView || tabletView ? true : false,
  };
  return (
    <ProductSliderWrapper>
      <Title>{title}</Title>
      <Slider {...settings}>
        {productList && productList.length
          ? productList.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          : null}
      </Slider>
    </ProductSliderWrapper>
  );
};

export default ProductSlider;
