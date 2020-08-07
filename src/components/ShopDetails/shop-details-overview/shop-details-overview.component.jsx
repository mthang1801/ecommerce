import React from 'react'
import {ShopDetailsOverViewContainer} from "./shop-details-overview.styles";
import MainInterface from "../main-interface/main-interface.component";
import Taskbar from "../taskbar/taskbar.component";
import ListRelatedProducts from "../list-related-products/list-related-products.component";
const ShopDetailsOverView = () => {
  return (
    <ShopDetailsOverViewContainer>
      <MainInterface/>
      <Taskbar/>
      <ListRelatedProducts/>
    </ShopDetailsOverViewContainer>
  )
}

export default ShopDetailsOverView
