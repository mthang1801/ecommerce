import React, { useEffect, useState } from "react";
import { ProductsPopupContainer } from "./products-popup.styles";
import { selectMenuList } from "../../../redux/menu/menu.selectors";
import ProductsPopupItem from "../products-popup-item/products-popup-item.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
const ProductsPopup = ({ offsetWidth, categoryId, menuList }) => {
  return (
    <React.Fragment>
      {categoryId ? (
        <ProductsPopupContainer offsetWidth={offsetWidth}>
          {menuList[categoryId].productType.map((productType) => (
            <React.Fragment>
              {productType.products.length ? (
                <ProductsPopupItem
                  key={productType._id}
                  productLabel={productType.name}
                  productList={productType.products}
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
