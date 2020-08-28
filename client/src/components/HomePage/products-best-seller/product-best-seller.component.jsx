import React, { useEffect, useState } from "react";
import {
  ProductBestSellerContainer,
  Title,
  Grid,
} from "./product-best-seller.styles";
import { getBestSellerProducts } from "../../../utils/connectDB";
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

const ProductsBestSeller = ({ mobileView, tabletView }) => {
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
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  useEffect(() => {
    let _mounted = true;
    getBestSellerProducts().then(data => {
      if(_mounted){
        setBestSellerProducts(data);
      }
    });
    return () => _mounted = false;
  }, [getBestSellerProducts]);
  
  let productsBestSellerGroup = [];
  let accumulatorProducts = [];
  bestSellerProducts.forEach((product, idx) => {
    if (idx !== 0 && idx % 3 === 0) {
      productsBestSellerGroup.push(accumulatorProducts);
      accumulatorProducts = [];
    }
    accumulatorProducts.push(product);
    if (idx % 3 !== 0 && idx === bestSellerProducts.length - 1) {
      productsBestSellerGroup.push(accumulatorProducts);
      accumulatorProducts = [];
    }
  });
  return (
    <ProductBestSellerContainer>
      <Title>sản phẩm bán chạy</Title>
      <Slider {...settings} style={{ height: "85%" }} autoplaySpeed={3000}>
        {!mobileView ? productsBestSellerGroup.map((groups, id) => (
          <Grid key={id}>
            {groups.map((product) => (
              <ProductItem key={product._id} product={product}/>
            ))}
          </Grid>
        )) : bestSellerProducts.map(product => (
          <ProductItem key={product._id} product={product}/>
        ))}
      </Slider>
    </ProductBestSellerContainer>
  );
};

export default ProductsBestSeller;
