import React from "react";
import {
  LatestProductsContainer,
  Title,
  Grid,
} from "./products-latest.styles";
import { getLastestProducts } from "../../../utils/algorithms";
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

let lastestProducts = getLastestProducts();
let latestProductsGroup = [];
let accumulatorProducts = [];
lastestProducts.forEach( (product,idx) => {
  if( (idx !== 0 && idx % 3 === 0 )  ){
    latestProductsGroup.push(accumulatorProducts);
    accumulatorProducts = [];
  }    
  accumulatorProducts.push(product)
  if( idx %3 !==0 && idx === lastestProducts.length -1 ){
    latestProductsGroup.push(accumulatorProducts);
    accumulatorProducts = [];
  }
})

const LatestProducts = () => { 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,    
    slidesToShow: 1,
    slidesToScroll: 1,  
    nextArrow : null ,
    prevArrow : null ,
    adaptiveHeight : true  ,
    autoplay : true
    
  };

  return (
    <LatestProductsContainer>
      <Title>sản phẩm mới</Title>
      <Slider {...settings} style={{height: "85%"}}  autoplaySpeed={3000}>
        {latestProductsGroup.map((groups, id) => (
          <Grid key={id}>
            {groups.map((product) => (
              <ProductItem key={product.userId} product={product}/>
            ))}
          </Grid>
        ))}
      </Slider>
    </LatestProductsContainer>
  );
};

export default LatestProducts;
