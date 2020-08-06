import React from 'react'
import {CartPageContainer} from "./cart.styles";
import Background from "../../components/Layout/background/background.component";
import CartOverview from "../../components/Cart/cart-overview/cart-overview.component";

const CartPage = () => {
  return (
    <CartPageContainer>
      <Background label="Shopping Cart"/>
      <CartOverview/>
    </CartPageContainer>
  )
}

export default CartPage
