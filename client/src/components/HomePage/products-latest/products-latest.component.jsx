import React, { useState, useEffect,  memo } from "react";
import {LatestProductsWrapper} from "./products-latest.styles";
import { getLatestProducts } from "../../../utils/connectDB";
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {selectProductsLatest} from "../../../redux/home/home.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
const LatestProducts = ({ mobileView, tabletView, latestProducts }) => {
  return (
   <LatestProductsWrapper>
     <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={latestProducts} title="Sản phẩm mới"/>
   </LatestProductsWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  latestProducts : selectProductsLatest
})
export default memo(connect(mapStateToProps)(LatestProducts));
