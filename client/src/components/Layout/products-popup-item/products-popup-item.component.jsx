import React, {useState, useEffect} from "react";
import {
  ProductsPopupItemContainer,
  Label,
  CustomLink,
} from "./products-popup-item.styles";
const ProductsPopupItem = ({ productLabel, productList }) => {
    
  return (    
    <ProductsPopupItemContainer>
      <Label>{productLabel}</Label>
      {productList.length ? (
        productList.map((product) => (
          <CustomLink title={product.name} to={product.linkUrl}>
            {product.name}
          </CustomLink>
        ))
      ): null}
    </ProductsPopupItemContainer>
  );
};
// const  mapStateToProps = createStructuredSelector({  
//   productList : selectProductList
// })
export default ProductsPopupItem;
