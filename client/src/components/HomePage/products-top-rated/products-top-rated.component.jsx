import React , {useEffect, useState} from "react";
import {
  LatestProductsContainer,
  Title,
  Grid,
} from "./products-top-rated.styles";
import { getTopRatedProducts } from "../../../utils/connectDB";
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

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
  const [topRatedProducts, setTopRatedProduct] = useState([]);
  useEffect(() => {
    let _mounted = true ;
    getTopRatedProducts().then(data => {
      if(_mounted){
        setTopRatedProduct(data);
      }
    })
    return () => _mounted = false; 
  }, [getTopRatedProducts])
 
  let productTopRatedGroup = [];
  let accumulatorProducts = [];
  topRatedProducts.forEach((product, idx) => {
    if (idx !== 0 && idx % 3 === 0) {
      productTopRatedGroup.push(accumulatorProducts);
      accumulatorProducts = [];
    }
    accumulatorProducts.push(product);
    if (idx % 3 !== 0 && idx === topRatedProducts.length - 1) {
      productTopRatedGroup.push(accumulatorProducts);
      accumulatorProducts = [];
    }
  });
  return (
    <LatestProductsContainer>
      <Title>Top rate</Title>
      <Slider {...settings} style={{ height: "85%" }} autoplaySpeed={3000}>
        {!mobileView
          ? productTopRatedGroup.map((groups, id) => (
              <Grid key={id}>
                {groups.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </Grid>
            ))
          : topRatedProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
      </Slider>
    </LatestProductsContainer>
  );
};

export default ProductsTopRated;
