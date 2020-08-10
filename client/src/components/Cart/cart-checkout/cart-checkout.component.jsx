import React from 'react'
import {CartCheckoutContainer, Grid} from "./cart-checkout.styles";
import CartDiscount from "../cart-discount/cart-discount.component";
import CartSummary from "../cart-summary/cart-summary.component";
const CartCheckout = ({mobileView, tabletView}) => {
  return (
    <CartCheckoutContainer mobileView={mobileView} tabletView={tabletView}>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <CartDiscount mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <CartSummary mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
    </CartCheckoutContainer>
  )
}

export default CartCheckout
