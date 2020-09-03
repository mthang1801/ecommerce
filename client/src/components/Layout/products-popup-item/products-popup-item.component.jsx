import React, {useState, useEffect, memo} from "react";
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
        productList.map((product) => {          
          const linkUrl = product.linkUrl;          
          return (
          <CustomLink key={product._id} title={product.name} to={linkUrl}>
            {product.name}
          </CustomLink>
          )
        }
        
        )): null}
    </ProductsPopupItemContainer>
  );
};
export default memo(ProductsPopupItem);
