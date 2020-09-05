import React, { useEffect, useState, memo } from "react";
import { ProductsPopupContainer } from "./products-popup.styles";
import ProductsPopupItem from "../products-popup-item/products-popup-item.component";

const ProductsPopup = ({ offsetWidth, categoryId, data }) => {  
  console.log(data);
  return (
    <React.Fragment>
      {categoryId ? (
        <ProductsPopupContainer offsetWidth={offsetWidth}>
          {data.productTypes.map((productType) => {                                           
            return (
              <React.Fragment key={productType._id}>
              {productType.productsMenu.length ? (
                <ProductsPopupItem                  
                  productType={productType}
                  productList={productType.productsMenu}
                />
              ) : null}
            </React.Fragment>
            )
          })}
                   
        </ProductsPopupContainer>
      ) : null}
    </React.Fragment>
  );
};
export default memo(ProductsPopup);
