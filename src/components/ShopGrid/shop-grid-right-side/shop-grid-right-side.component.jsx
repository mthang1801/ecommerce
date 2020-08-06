import React from 'react'
import SalesOff from "../sales-off/sale-off.component";
import {ShopGridRigthSideContainer} from "./shop-grid-right-side.styles"
import TaskBar from "../taskbar/taksbar.component";
import ProductsGrid from "../products-grid/products-grid.component";
import Pagination from "../pagination/pagination.component";
const ShopGridRigthSide = () => {
  return (
    <ShopGridRigthSideContainer>
      <SalesOff/>
      <TaskBar/>
      <ProductsGrid/>
      <Pagination/>
    </ShopGridRigthSideContainer>
  )
}

export default ShopGridRigthSide
