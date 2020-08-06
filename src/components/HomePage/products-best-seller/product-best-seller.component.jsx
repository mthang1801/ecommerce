import React from "react";
import {
  ProductBestSellerContainer,
  Title,
  Grid
} from "./product-best-seller.styles";
import { getProductsBestSeller } from "../../../utils/algorithms";
import ProductItem from "../product-item/product-item.component";
import Slider from "react-slick";

const productsBestSeller = getProductsBestSeller();
let productsBestSellerGroup = [];
let accumulatorProducts = [];
productsBestSeller.forEach((product, idx) => {
  if (idx !== 0 && idx % 3 === 0) {
    productsBestSellerGroup.push(accumulatorProducts);
    accumulatorProducts = [];
  }
  accumulatorProducts.push(product);
  if (idx % 3 !== 0 && idx === productsBestSeller.length - 1) {
    productsBestSellerGroup.push(accumulatorProducts);
    accumulatorProducts = [];
  }
});
const ProductsBestSeller = () => {
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
    <ProductBestSellerContainer>
      <Title>sản phẩm bán chạy</Title>
      <Slider {...settings} style={{ height: "85%" }} autoplaySpeed={3000}>
        {productsBestSellerGroup.map((groups, id) => (
          <Grid key={id}>
            {groups.map((product) => (
              <ProductItem key={product.userId} product={product}/>
            ))}
          </Grid>
        ))}
      </Slider>
    </ProductBestSellerContainer>
  );
};

export default ProductsBestSeller;
