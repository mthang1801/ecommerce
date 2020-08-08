import React from 'react'
import {CheckoutPageContainer} from "./checkout.styles";
import CheckoutOverview from "../../components/Checkout/checkout-overview/checkout-overview.component";
import Background from "../../components/Layout/background/background.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
const CheckoutPage = () => {
  return (
    <CheckoutPageContainer>
      <MasterHeader/>
      <Background label="Checkout"/>
      <CheckoutOverview/>
    </CheckoutPageContainer>
  )
}

export default CheckoutPage
