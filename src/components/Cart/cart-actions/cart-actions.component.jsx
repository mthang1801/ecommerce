import React from 'react'
import {CartActionsContainer, BtnShopping, BtnUpdate} from "./cart-actions.styles";
import {GrUpdate} from "react-icons/gr"
const CartActions = () => {
  return (
    <CartActionsContainer>
      <BtnShopping>Tiếp tục mua sắm</BtnShopping>
      <BtnUpdate><GrUpdate/>Lưu thay đổi</BtnUpdate>
    </CartActionsContainer>
  )
}

export default CartActions
