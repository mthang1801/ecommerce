import React from 'react'
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import {SellerPageContainer} from "./seller.styles";
import Background from "../../components/Layout/background/background.component";
import SellerOverview from "../../components/Seller/seller-overview/seller-overview.component";
const SellerPage = () => {
  return (
    <SellerPageContainer>
      <MasterHeader/>
      <Background label={"Seller"}/>
      <SellerOverview/>
    </SellerPageContainer>
  )
}

export default SellerPage
