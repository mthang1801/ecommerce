import React from "react";
import {
  ProductsPopupItemContainer,
  Label,
  CustomLink,
} from "./products-popup-item.styles";

const ProductsPopupItem = ({ productLabel, productList }) => {
  console.log(productList);
  return (
    <ProductsPopupItemContainer>
      <Label>{productLabel}</Label>
      {productList && productList.length < 10 ? (
        productList.map((product) => (
          <CustomLink title={product.name} to={product.linkUrl}>
            {product.name}
          </CustomLink>
        ))
      ) : productList && (
        <React.Fragment>
          {productList
            .filter((_, idx) => idx < 10)
            .map((product) => (
              <CustomLink title={product.name} to={product.linkUrl}>
                {product.name}
              </CustomLink>
            ))}
          <CustomLink to="/" style={{textAlign: "center", color: "blue"}}>Xem thêm...</CustomLink>
        </React.Fragment>
      )}
    </ProductsPopupItemContainer>
  );
};

export default ProductsPopupItem;
