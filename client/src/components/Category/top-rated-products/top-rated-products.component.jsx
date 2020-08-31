import React from 'react'
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {TopRatedProductsWrapper} from "./top-rated-products.styles";
const TopRatedProducts = ({ mobileView, tabletView, productList }) => {
  return (
    <TopRatedProductsWrapper>
      <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={productList} title="Sản phẩm HOT" smallView/>
    </TopRatedProductsWrapper>
  )
}

export default TopRatedProducts
