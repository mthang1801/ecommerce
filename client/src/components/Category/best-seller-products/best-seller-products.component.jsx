import React from 'react'
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {BestSellerProductsWrapper} from "./best-seller-products.styles";
const BestSellerProducts = ({ mobileView, tabletView, productList }) => {
  return (
    <BestSellerProductsWrapper>
      <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={productList} title="Sản phẩm bán chạy" smallView/>
    </BestSellerProductsWrapper>
  )
}

export default BestSellerProducts
