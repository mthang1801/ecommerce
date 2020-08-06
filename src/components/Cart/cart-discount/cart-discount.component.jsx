import React from 'react'
import {CartDiscountContainer, Label, Form, Input, Button} from "./cart-discount.styles";
const CartDiscount = () => {
  return (
    <CartDiscountContainer>
      <Label>Mã giảm giá</Label>
      <Form>
        <Input type="text" placeholder="Nhập mã giảm giá"/>
        <Button>Áp dụng</Button>
      </Form>
    </CartDiscountContainer>
  )
}

export default CartDiscount
