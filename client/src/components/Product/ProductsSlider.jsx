import React, { memo } from "react";
import { ProductSliderWrapper, Title } from "./styles/ProductsSlider.styles";
import { withRouter } from "react-router-dom";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import LazyLoad from "react-lazyload";
const ProductSlider = ({ title, productList }) => {
  let dragging = false;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: window.innerWidth < 600 ? 1 : window.innerWidth < 992 ? 2 : 4,
    slidesToScroll: window.innerWidth < 992 || productList.length === 1 ? 1 : 2,
    autoplay: true,
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
  };

  return (
    <ProductSliderWrapper>
      <Title>{title}</Title>
      <Slider {...settings} style={{ height: "100%" }} autoplaySpeed={3000}>
        {productList.length
          ? productList.map((product) => (
              <LazyLoad>
                <ProductItem key={product._id} product={product} />
              </LazyLoad>
            ))
          : null}
      </Slider>
    </ProductSliderWrapper>
  );
};

export default withRouter(memo(ProductSlider));
