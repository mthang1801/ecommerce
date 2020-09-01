import React from "react";
import ProductItem from "../../UI/product-item/product-item.component";
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {SaleOffContainer} from "./sale-off.styles"
const SaleOff = ({ mobileView, tabletView, productList }) => { 
  return (
    <SaleOffContainer>
      <ProductSlider  mobileView={mobileView} tabletView={tabletView} productList={productList} title="Mặt hàng đang giảm giá" smallView/>
    </SaleOffContainer>
  );
};

export default SaleOff;
