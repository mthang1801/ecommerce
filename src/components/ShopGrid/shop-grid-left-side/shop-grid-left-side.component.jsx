import React from 'react'
import {ShopGridLeftSideContainer} from "./shop-grid-left-side.styles";
import Department from "../department/department.component";
import PriceScope from "../price-scope/price-scope.component";
import ProductsLatest from "../../HomePage/products-latest/products-latest.component"
const ShopGridLeftSide = () => {
  return (
    <ShopGridLeftSideContainer>   
      <Department/>
      <PriceScope/>
      <ProductsLatest/>
    </ShopGridLeftSideContainer>
  )
}

export default ShopGridLeftSide
