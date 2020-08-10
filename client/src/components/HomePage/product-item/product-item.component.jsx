import React from "react";
import {
  ProductItemContainer,
  ProductImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  OriginalPrice,
  ProductDiscountPrice,
} from "./product-item.styles";

import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
const ProductItem = ({ product }) => {
  return (
    <ProductItemContainer key={product.userId} title={product.name}>
      <ProductImageContainer>
        <ProductImage src={product.imageUrl} />
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="read-only"
            value={product.votes}
            precision={0.5}
            readOnly
          />
        </Box>
      </ProductImageContainer>
      <ProductInfo>
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
      </ProductInfo>
    </ProductItemContainer>
  );
};

export default ProductItem;
