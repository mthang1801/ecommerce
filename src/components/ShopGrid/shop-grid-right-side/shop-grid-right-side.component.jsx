import React from 'react'
import SalesOff from "../sales-off/sale-off.component";
import {ShopGridRigthSideContainer} from "./shop-grid-right-side.styles"
import TaskBar from "../taskbar/taksbar.component";
import ProductsGrid from "../products-grid/products-grid.component";
import Pagination from "../right-side-pagination/right-side-pagination.component";
const ShopGridRigthSide = ({mobileView, tabletView}) => {
  return (
    <ShopGridRigthSideContainer>
      <SalesOff mobileView={mobileView} tabletView={tabletView}/>
      <TaskBar mobileView={mobileView} tabletView={tabletView}/>
      <ProductsGrid mobileView={mobileView} tabletView={tabletView}/>
      <Pagination/>
    </ShopGridRigthSideContainer>
  )
}

export default ShopGridRigthSide
