import React, { useEffect, useState, memo } from "react";
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {ProductsFavoriteWrapper} from "./products-favorite.styles";
import {selectProductsFavorite} from "../../../redux/home/home.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux"
const ProductsFavorite = ({ mobileView, tabletView, favoriteProducts }) => {   
  return (
    <ProductsFavoriteWrapper>
      <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={favoriteProducts} title="Sản phẩm bạn yêu thích"/>
    </ProductsFavoriteWrapper> 
  );
};
const mapStateToProps = createStructuredSelector({
  favoriteProducts : selectProductsFavorite
})
export default memo(connect(mapStateToProps)(ProductsFavorite));
