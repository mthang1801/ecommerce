import React from 'react'
import ProductSlider from "../product-slider/product-slider.component";
const BestSellerProducts = ({ mobileView, tabletView, productList }) => {
  return (
    <React.Fragment>
      <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={productList} title="Sản phẩm bán chạy" />
    </React.Fragment>
  )
}

export default BestSellerProducts
