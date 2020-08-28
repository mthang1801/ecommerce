import React, { useState, useEffect,  memo } from "react";
import { LatestProductsContainer, Title, Grid } from "./products-latest.styles";
import { getLatestProducts } from "../../../utils/connectDB";
import ProductItem from "../product-item/product-item.component";
import AppContext from "../../../context/app-viewport.context";
import Slider from "react-slick";

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
    let _mounted = true ;
    getLatestProducts().then((data) => {
      if(_mounted){
        setLatestProducts(data);
      }
           
    });
    return () => _mounted = false 
  }, [getLatestProducts]);
  
  return (
    <LatestProductsContainer>
      <Title>sản phẩm mới</Title>
      <Slider {...settings} style={{ height: "85%" }} autoplaySpeed={3000}>
        {latestProducts.length
          ? !mobileView
            ? latestProductsGroup.map((groups, id) => (
                <Grid key={id}>
                  {groups.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </Grid>
              ))
            : latestProducts.map((product, id) => (
                <ProductItem key={product._id} product={product} />
              ))
          : null}
      </Slider>
    </LatestProductsContainer>
  );
};

export default memo(LatestProducts);
