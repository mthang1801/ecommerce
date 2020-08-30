import React from "react";
import ProductItem from "../../UI/product-item/product-item.component";
import ProductSlider from "../../UI/product-slider/product-slider.component";
const SaleOff = ({ mobileView, tabletView, productList }) => { 
  return (
    <React.Fragment>
      <ProductSlider  mobileView={mobileView} tabletView={tabletView} productList={productList} title="Mặt hàng đang giảm giá"/>
    </React.Fragment>
  );
};

export default SaleOff;
