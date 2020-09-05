import React from 'react'
import {CartSummaryContainer, Label, Grid, CartKey,CartValue, CheckoutButton} from "./cart-summary.styles";
import {selectTotalPrice, selectCountItem} from "../../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
const CartSummary = ({mobileView, tabletView, totalPrice, countItem, history}) => {
  return (
    <CartSummaryContainer>
      <Label>Tóm tắt hóa đơn</Label>
      <Grid>
        <CartKey>Số đơn hàng</CartKey>
        <CartValue>{countItem}</CartValue>
      </Grid>
      <Grid>
        <CartKey>Số tiền thanh toán</CartKey>
        <CartValue>{totalPrice.toLocaleString("es-AR")} VND</CartValue>
      </Grid>
      <CheckoutButton mobileView={mobileView} tabletView={tabletView} onClick={() => history.push("/checkout")}>tiến hành thanh toán</CheckoutButton>
    </CartSummaryContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  countItem : selectCountItem, 
  totalPrice : selectTotalPrice 
})

export default connect(mapStateToProps)(withRouter(CartSummary))
