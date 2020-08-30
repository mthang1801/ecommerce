import React, { useEffect, useState } from "react";
import { ProductsPopupContainer } from "./products-popup.styles";
import ProductsPopupItem from "../products-popup-item/products-popup-item.component";
const ProductsPopup = ({ offsetWidth, categoryId, data }) => {  
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
export default ProductsPopup;
