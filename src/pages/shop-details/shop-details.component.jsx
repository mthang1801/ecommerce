import React from 'react'
import {ShopDetailsContainer} from "./shop-details.styles";
import Background  from "../../components/Layout/background/background.component";
import ShopDetailsOverview from "../../components/ShopDetails/shop-details-overview/shop-details-overview.component";
const ShopDetailPage = () => {
  return (
    <ShopDetailsContainer>
      <Background label="Laptop’s Package"/>
      <ShopDetailsOverview/>
    </ShopDetailsContainer>
  )
}

export default ShopDetailPage
