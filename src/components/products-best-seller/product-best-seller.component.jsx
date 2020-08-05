import React from "react";
import {
  ProductBestSellerContainer,
  Title,
  Grid,
  Slot,
  ProductImageContainer,
  ProductImage,
  ProductLabel,
  ProductDiscountPrice,
  ProductName,
  OriginalPrice,
} from "./product-best-seller.styles";
import { getProductsBestSeller } from "../../utils/algorithms";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
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
              <Slot key={product.userId}>
                <ProductImageContainer>
                  <ProductImage src={product.imageUrl} />
                  <Box component="fieldset" mb={3} borderColor="transparent">                  
                    <Rating name="read-only" value={product.votes} precision={0.5} readOnly />
                  </Box>
                </ProductImageContainer>
                <ProductLabel>
                  <ProductName>{product.name}</ProductName>
                  {product.discount === 0 ? (
                    <OriginalPrice>
                      {product.price.toLocaleString("es-AR")} Đ
                    </OriginalPrice>
                  ) : (
                    <React.Fragment>
                      <OriginalPrice discount>
                        {product.price.toLocaleString("es-AR")} Đ
                      </OriginalPrice>
                      <ProductDiscountPrice>
                        {(
                          (product.price * (100 - product.discount)) /
                          100
                        ).toLocaleString("es-AR")}{" "}
                        Đ
                      </ProductDiscountPrice>
                    </React.Fragment>
                  )}
                </ProductLabel>
              </Slot>
            ))}
          </Grid>
        ))}
      </Slider>
    </ProductBestSellerContainer>
  );
};

export default ProductsBestSeller;
