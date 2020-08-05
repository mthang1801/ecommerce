import React from 'react'
import {ShopGridPageContainer} from "./shop-grid.styles";
import ShopGridOverview from "../../components/ShopGrid/shop-grid-overview/shop-grid-overview.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component"
import Background from "../../components/ShopGrid/background/background.component"
const ShopGridPage = () => {
  return (
    <ShopGridPageContainer>        
      <MasterHeader/>
      <Background/>   
      <ShopGridOverview/>
    </ShopGridPageContainer>
  )
}

export default ShopGridPage
