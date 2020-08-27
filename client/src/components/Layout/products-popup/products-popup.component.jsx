import React, { useEffect, useState } from "react";
import { ProductsPopupContainer } from "./products-popup.styles";
import { selectMenuList } from "../../../redux/menu/menu.selectors";
import ProductsPopupItem from "../products-popup-item/products-popup-item.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
const ProductsPopup = ({ offsetWidth, categoryId, data }) => {
  return (
    <React.Fragment>
      {categoryId ? (
        <ProductsPopupContainer offsetWidth={offsetWidth}>
          {data.productTypes.map((productType) => (
            <React.Fragment>
              {productType.productsMenu.length ? (
                <ProductsPopupItem
                  key={productType._id}
                  productType={productType}
                  productList={productType.productsMenu}
                />
              ) : null}
            </React.Fragment>
          ))}
        </ProductsPopupContainer>
      ) : null}
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  menuList: selectMenuList,
});
export default connect(mapStateToProps)(ProductsPopup);
