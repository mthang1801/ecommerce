import React, { useState, useEffect, memo } from "react";
import { ProductSliderWrapper, Title, Grid } from "./product-slider.styles";
import { getLatestProducts } from "../../../utils/connectDB";
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

const ProductSlider = ({ mobileView, tabletView, title, productList }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: mobileView ? 1 : tabletView ? 2 : 4,
    slidesToScroll: mobileView || tabletView ? 1  : 2,
    autoplay: true,
  };
  // const [latestProducts, setLatestProducts] = useState([]);

  // let latestProductsGroup = [];
  // let accumulatorProducts = [];
  // latestProducts.forEach((product, idx) => {
  //   if (idx !== 0 && idx % 3 === 0) {
  //     latestProductsGroup.push(accumulatorProducts);
  //     accumulatorProducts = [];
  //   }
  //   accumulatorProducts.push(product);
  //   if (idx % 3 !== 0 && idx === latestProducts.length - 1) {
  //     latestProductsGroup.push(accumulatorProducts);
  //     accumulatorProducts = [];
  //   }
  // });

  return (
    <ProductSliderWrapper>
      <Title>{title}</Title>
      <Slider {...settings} style={{ height: "300px" }} autoplaySpeed={3000}>
        {productList.length &&
          productList.map((product, id) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </Slider>
    </ProductSliderWrapper>
  );
};

export default memo(ProductSlider);
