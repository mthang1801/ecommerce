import React from 'react'
import {CartSummaryContainer, Label, Grid, CartKey,CartValue, CheckoutButton} from "./cart-summary.styles";
const CartSummary = ({mobileView, tabletView}) => {
  return (
    <CartSummaryContainer>
      <Label>Hóa đơn</Label>
      <Grid>
        <CartKey>Số đơn hàng</CartKey>
        <CartValue>3</CartValue>
      </Grid>
      <Grid>
        <CartKey>Số tiền thanh toán</CartKey>
        <CartValue>118.221.000 VND</CartValue>
      </Grid>
      <CheckoutButton mobileView={mobileView} tabletView={tabletView}>tiến hành thang toán</CheckoutButton>
    </CartSummaryContainer>
  )
}

export default CartSummary
