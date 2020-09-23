import React, { useEffect, useState, memo } from "react";
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {ProductsBestSellerWrapper} from "./product-best-seller.styles";
import {selectProductsBestSeller} from "../../../redux/home/home.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
const ProductsBestSeller = ({ mobileView, tabletView, bestSellerProducts }) => {   
  return (
    <ProductsBestSellerWrapper>
      <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={bestSellerProducts} title="Sản phẩm bán chạy"/>
    </ProductsBestSellerWrapper> 
  );
};
const mapStateToProps = createStructuredSelector({
  bestSellerProducts : selectProductsBestSeller
})
export default memo(connect(mapStateToProps)(ProductsBestSeller));
