import React from 'react'
import SalesOff from "../sales-off/sale-off.component";
import BestSellerProducts from "../best-seller-products/best-seller-products.component";
import TopRatedProducts from "../top-rated-products/top-rated-products.component";
import {ShopGridRigthSideContainer} from "./category-right-side.styles"
import TaskBar from "../taskbar/taksbar.component";
import {default as Products} from "../products/products.container";
import Pagination from "../right-side-pagination/right-side-pagination.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectDiscountProductList, selectBestSellerProducts, selectTopRatedProducts, selectProductList, selectNumPages, selectNumProducts, selectCurrentPage} from  "../../../redux/category/category.selectors";

const ShopGridRigthSide = ({mobileView, tabletView, discountProductList, bestSellerProductList,topRatedProductList, productList, numProducts, currentPage, numPages}) => {
  return (
    <ShopGridRigthSideContainer>
      {discountProductList.length && <SalesOff mobileView={mobileView} tabletView={tabletView} productList={discountProductList}/> }
      {bestSellerProductList.length && <BestSellerProducts mobileView={mobileView} tabletView={tabletView} productList={bestSellerProductList}/>}
      {topRatedProductList.length && <TopRatedProducts mobileView={mobileView} tabletView={tabletView} productList={topRatedProductList}/>}      
      <TaskBar mobileView={mobileView} tabletView={tabletView} numProducts={numProducts} />
      {productList.length && <Products mobileView={mobileView} tabletView={tabletView} productList={productList}/>}
      {numPages > 0 && <Pagination currentPage={currentPage} numPages={numPages}/>}
    </ShopGridRigthSideContainer>
  )
}
const mapStateToProps = createStructuredSelector({
  discountProductList : selectDiscountProductList,
  bestSellerProductList : selectBestSellerProducts,
  topRatedProductList : selectTopRatedProducts,
  productList : selectProductList,
  numProducts : selectNumProducts,
  numPages : selectNumPages,
  currentPage : selectCurrentPage
})
export default connect(mapStateToProps)(ShopGridRigthSide)
