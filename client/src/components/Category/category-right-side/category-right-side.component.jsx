import React from 'react'
import SalesOff from "../sales-off/sale-off.component";
import BestSellerProducts from "../best-seller-products/best-seller-products.component";
import {ShopGridRigthSideContainer} from "./category-right-side.styles"
import TaskBar from "../taskbar/taksbar.component";
import ProductsGrid from "../products-grid/products-grid.component";
import Pagination from "../right-side-pagination/right-side-pagination.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectDiscountProductList, selectBestSellerProducts} from  "../../../redux/category/category.selectors";

const ShopGridRigthSide = ({mobileView, tabletView, discountProductList, bestSellerProductList}) => {
  return (
    <ShopGridRigthSideContainer>
      <SalesOff mobileView={mobileView} tabletView={tabletView} productList={discountProductList}/>
      <BestSellerProducts mobileView={mobileView} tabletView={tabletView} productList={bestSellerProductList}/>
      <TaskBar mobileView={mobileView} tabletView={tabletView}/>
      <ProductsGrid mobileView={mobileView} tabletView={tabletView}/>
      <Pagination/>
    </ShopGridRigthSideContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  discountProductList : selectDiscountProductList,
  bestSellerProductList : selectBestSellerProducts
})
export default connect(mapStateToProps)(ShopGridRigthSide)
