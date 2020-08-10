import React from "react";
import {
  LatestProductsContainer,
  Title,
  Grid,
} from "./products-top-rated.styles";
import { getProductsTopRated } from "../../../utils/algorithms";
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

let productsTopRated = getProductsTopRated();
let productTopRatedGroup = [];
let accumulatorProducts = [];
productsTopRated.forEach((product, idx) => {
  if (idx !== 0 && idx % 3 === 0) {
    productTopRatedGroup.push(accumulatorProducts);
    accumulatorProducts = [];
  }
  accumulatorProducts.push(product);
  if (idx % 3 !== 0 && idx === productsTopRated.length - 1) {
    productTopRatedGroup.push(accumulatorProducts);
    accumulatorProducts = [];
  }
});

const ProductsTopRated = ({ mobileView, tabletView }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: null,
    prevArrow: null,
    adaptiveHeight: true,
    autoplay: true,
  };

  return (
    <LatestProductsContainer>
      <Title>Top rate</Title>
      <Slider {...settings} style={{ height: "85%" }} autoplaySpeed={3000}>
        {!mobileView
          ? productTopRatedGroup.map((groups, id) => (
              <Grid key={id}>
                {groups.map((product) => (
                  <ProductItem key={product.userId} product={product} />
                ))}
              </Grid>
            ))
          : productsTopRated.map((product) => (
              <ProductItem key={product.userId} product={product} />
            ))}
      </Slider>
    </LatestProductsContainer>
  );
};

export default ProductsTopRated;
