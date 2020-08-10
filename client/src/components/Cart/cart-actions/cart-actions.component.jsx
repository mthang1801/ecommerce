import React from 'react'
import {CartActionsContainer, BtnShopping, BtnUpdate} from "./cart-actions.styles";
import {GrUpdate} from "react-icons/gr"
const CartActions = ({mobileView, tabletView}) => {
  return (
    <CartActionsContainer mobileView={mobileView} tabletView={tabletView}>
      <BtnShopping mobileView={mobileView} tabletView={tabletView}>Tiếp tục mua sắm</BtnShopping>
      <BtnUpdate mobileView={mobileView} tabletView={tabletView} ><GrUpdate/>Lưu thay đổi</BtnUpdate>
    </CartActionsContainer>
  )
}

export default CartActions
