import React from 'react'
import {CheckoutPageContainer} from "./checkout.styles";
import CheckoutOverview from "../../components/Checkout/checkout-overview/checkout-overview.component";
import Background from "../../components/Layout/background/background.component";
const CheckoutPage = () => {
  return (
    <CheckoutPageContainer>
      <Background label="Checkout"/>
      <CheckoutOverview/>
    </CheckoutPageContainer>
  )
}

export default CheckoutPage
