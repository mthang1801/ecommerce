import React, { useEffect, useState, memo } from "react";
import { ProductsTopRatedWrapper } from "./products-top-rated.styles";
import { getTopRatedProducts } from "../../../utils/connectDB";
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {selectProductsTopRated} from "../../../redux/home/home.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
const ProductsTopRated = ({ mobileView, tabletView, topRatedProducts}) => {
  return <ProductsTopRatedWrapper>
    <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={topRatedProducts} title="Sản phẩm HOT"/>
  </ProductsTopRatedWrapper>;
};
const mapStateToProps = createStructuredSelector({
  topRatedProducts : selectProductsTopRated
})
export default memo(connect(mapStateToProps)(ProductsTopRated));
