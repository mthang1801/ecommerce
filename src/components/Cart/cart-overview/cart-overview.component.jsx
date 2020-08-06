import React from 'react'
import {CartOverViewContainer} from "./cart-overview.styles";
import CartTable from "../cart-table/cart-table.component";
import CartCheckout from "../cart-checkout/cart-checkout.component";
import CartActions from "../cart-actions/cart-actions.component";
const CartOverView = () => {
  return (
    <CartOverViewContainer>
      <CartTable/>
      <CartActions/>
      <CartCheckout/>
    </CartOverViewContainer>
  )
}

export default CartOverView
