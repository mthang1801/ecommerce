import React, { useState, useEffect, useContext } from "react";
import { LatestProductsContainer, Title, Grid } from "./products-latest.styles";
import { getLatestProducts } from "../../../utils/algorithms";
import ProductItem from "../product-item/product-item.component";
import AppContext from "../../../context/app-viewport.context";
import Slider from "react-slick"

const LatestProducts = ({ mobileView, tabletView }) => {
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
  const [latestProducts, setLatestProducts] = useState([]);

  let latestProductsGroup = [];
  let accumulatorProducts = [];
  latestProducts.forEach((product, idx) => {
    if (idx !== 0 && idx % 3 === 0) {
      latestProductsGroup.push(accumulatorProducts);
      accumulatorProducts = [];
    }
    accumulatorProducts.push(product);
    if (idx % 3 !== 0 && idx === latestProducts.length - 1) {
      latestProductsGroup.push(accumulatorProducts);
      accumulatorProducts = [];
    }
  });
  useEffect(() => {
    getLatestProducts().then(data => {
      setLatestProducts(data);
      console.log(data);
    });
  }, [getLatestProducts])

  return (
    <LatestProductsContainer>
      <Title>sản phẩm mới</Title>
      <Slider {...settings} style={{ height: "85%" }} autoplaySpeed={3000}>
        {!mobileView
          ? latestProductsGroup.map((groups, id) => (
              <Grid key={id}>
                {groups.map((product) => (
                  <ProductItem key={product.userId} product={product} />
                ))}
              </Grid>
            ))
          : latestProducts.map((product, id) => (
              <ProductItem key={product.userId} product={product} />
            ))}
      </Slider>
    </LatestProductsContainer>
  );
};

export default LatestProducts;
