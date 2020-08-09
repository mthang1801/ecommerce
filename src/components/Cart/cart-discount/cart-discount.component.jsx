import React from 'react'
import {CartDiscountContainer, Label, Form, Input, Button} from "./cart-discount.styles";
const CartDiscount = ({mobileView, tabletView}) => {
  return (
    <CartDiscountContainer>
      <Label>Mã giảm giá</Label>
      <Form mobileView={mobileView} tabletView={tabletView}>
        <Input type="text" placeholder="Nhập mã giảm giá" mobileView={mobileView} tabletView={tabletView}/>
        <Button mobileView={mobileView} tabletView={tabletView}>Áp dụng</Button>
      </Form>
    </CartDiscountContainer>
  )
}

export default CartDiscount
