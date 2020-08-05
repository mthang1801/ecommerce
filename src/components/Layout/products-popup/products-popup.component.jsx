import React from "react";
import { ProductsPopupContainer } from "./products-popup.styles";
import { getProductsListByCategoryId } from "../../../utils/algorithms";
import ProductsPopupItem from "../products-popup-item/products-popup-item.component";
const ProductsPopup = React.forwardRef(
  ({offsetWidth, categoryId }, ref) => {
   
    let productsDict = getProductsListByCategoryId(categoryId);
    console.log(productsDict)
    return (
      <ProductsPopupContainer offsetWidth={offsetWidth} ref={ref} >
        {Object.keys(productsDict).map((productItem) => (
          <ProductsPopupItem
            key={productItem}
            productLabel={productItem}
            productList={productsDict[productItem]}
          />
        ))}
      </ProductsPopupContainer>
    );
  }
);

export default ProductsPopup;
