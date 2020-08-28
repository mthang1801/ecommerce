import React, {useState, useEffect} from "react";
import {
  ProductsPopupItemContainer,
  LinkProductType,
  CustomLink,
} from "./products-popup-item.styles";
const ProductsPopupItem = ({ productType, productList }) => {
    
  return (    
    <ProductsPopupItemContainer>
      <LinkProductType to={`${productType.linkUrl}`}>{productType.name}</LinkProductType>
      {productList.length ? (
        productList.map((product) => (
          <CustomLink key={product._id} title={product.name} to={product.linkUrl}>
            {product.name}
          </CustomLink>
        ))
      ): null}
    </ProductsPopupItemContainer>
  );
};
export default ProductsPopupItem;
