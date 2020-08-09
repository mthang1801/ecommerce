import React from 'react'
import {ShopGridLeftSideContainer} from "./shop-grid-left-side.styles";
import Department from "../department/department.component";
import PriceScope from "../price-scope/price-scope.component";
import ProductsLatest from "../../HomePage/products-latest/products-latest.component";
const ShopGridLeftSide = ({mobileView, tabletView}) => {  
  return (
    <ShopGridLeftSideContainer>   
      <Department/>
      <PriceScope mobileView={mobileView} tabletView={tabletView}/>
      <ProductsLatest mobileView={mobileView} tabletView={tabletView}/>
    </ShopGridLeftSideContainer>
  )
}

export default ShopGridLeftSide
