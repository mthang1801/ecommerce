import React from 'react'
import {CartCheckoutContainer, Grid} from "./cart-checkout.styles";
import CartDiscount from "../cart-discount/cart-discount.component";
import CartSummary from "../cart-summary/cart-summary.component";
const CartCheckout = () => {
  return (
    <CartCheckoutContainer>
      <Grid>
        <CartDiscount/>
      </Grid>
      <Grid>
        <CartSummary/>
      </Grid>
    </CartCheckoutContainer>
  )
}

export default CartCheckout
