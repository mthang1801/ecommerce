import React from 'react'
import {CartPageContainer} from "./cart.styles";
import Background from "../../components/Layout/background/background.component";
import CartOverview from "../../components/Cart/cart-overview/cart-overview.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
const CartPage = () => {
  return (
    <CartPageContainer>
      <MasterHeader/>
      <Background label="Shopping Cart"/>
      <CartOverview/>
    </CartPageContainer>
  )
}

export default CartPage
