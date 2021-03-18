import React from "react";
import {
  Wrapper,
  ListProducts,
  ProductItem,
  Title
} from "./styles/CategoryProductTypeItem.styles";

const CategoryProductTypeItem = ({ productType }) => {
  return (
    <Wrapper >
      <Title to={productType.linkUrl}>{productType.name}</Title>
      <ListProducts>
        {productType.productsMenu.map((product) => (
          <ProductItem key={`productItem-${product._id}`} to={product.linkUrl}>
            {product.name}
          </ProductItem>
        ))}
      </ListProducts>
    </Wrapper>
  );
};

export default CategoryProductTypeItem;
