import React, { useState, useEffect, memo } from "react";
import { ProductSliderWrapper, Title, Grid } from "./product-slider.styles";
import { getLatestProducts } from "../../../utils/connectDB";
import {withRouter} from "react-router-dom"
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

const ProductSlider = ({ mobileView, tabletView, title, productList, history , smallView }) => {
  console.log(mobileView,tabletView)
  let dragging = false;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: mobileView ? 1 : tabletView && productList.length ==1 ? 1 : tabletView && productList.length > 1 ? 2 : productList.length < 4 ?  productList.length : smallView ? 3 : 4,
    slidesToScroll: mobileView || tabletView || productList.length === 1 ? 1  : 2,
    autoplay: true,
    beforeChange: () => dragging = true,
    afterChange: () => dragging = false,
  };
    
  const handleClick = (linkUrl) => {
    if(!dragging){
      history.push(linkUrl)
    }
  }  
  return (
    <ProductSliderWrapper>
      <Title>{title}</Title>
      <Slider {...settings} style={{height:"100%"}} autoplaySpeed={3000}>
        {productList.length ?
          productList.map((product, id) => (
            <ProductItem key={product._id} product={product} onClick={(linkUrl) => handleClick(linkUrl)} />
          )) : null}
      </Slider>
    </ProductSliderWrapper>
  );
};

export default withRouter(memo(ProductSlider));
