import React from 'react'
import {CheckoutPageContainer} from "./checkout.styles";
import CheckoutOverview from "../../components/Checkout/checkout-overview/checkout-overview.component";
const CheckoutPage = () => {
  return (
    <CheckoutPageContainer>
      <CheckoutOverview/>
    </CheckoutPageContainer>
  )
}

export default CheckoutPage
