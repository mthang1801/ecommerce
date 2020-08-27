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
