import React from 'react'
import {CartOverViewContainer} from "./cart-overview.styles";
import CartTable from "../cart-table/cart-table.component";
import CartCheckout from "../cart-checkout/cart-checkout.component";
const CartOverView = () => {
  return (
    <CartOverViewContainer>
      <CartTable/>
      <CartCheckout/>
    </CartOverViewContainer>
  )
}

export default CartOverView
