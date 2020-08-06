import React from 'react'
import {CartTableContainer, TableHeader, Row, TableBody, TableRow, Image, Name, BtnRemove, TableFooter} from "./cart-table.styles";
import {getCartItems} from "../../../utils/algorithms";
const CartTable = () => {
  const cartItems = getCartItems();
  console.log(cartItems)
  return (
   <CartTableContainer>
     <TableHeader>
       <Row product>Mặt Hàng</Row>
       <Row>Giá</Row>
       <Row>Số lượng</Row>
       <Row>Giảm giá</Row>
       <Row>Thành tiền</Row>
       <Row></Row>
     </TableHeader>
     <TableBody>
       {cartItems.map(cart => (
         <TableRow key={cart._id}>
           <Row product>
             <Image src={cart.imageUrl}/>
             <Name>{cart.name}</Name>
           </Row>
           <Row>{cart.price.toLocaleString("es-AR")}</Row>
           <Row>{cart.quantity}</Row>
           <Row>{cart.discount}%</Row>
           <Row>{((cart.price*cart.quantity)* (100-cart.discount)/100).toLocaleString("es-AR")}</Row>
           <Row><BtnRemove>&times;</BtnRemove></Row>
         </TableRow>
       ))}
     </TableBody>
     <TableFooter>
       <Row product></Row>
       <Row></Row>
       <Row></Row>
       <Row><strong>Tổng tiền</strong></Row>
       <Row totalPrice>{cartItems.reduce((acc, item) => acc + (item.price * item.quantity)*(100 - item.discount) /100 , 0).toLocaleString("es-AR")}</Row>
       <Row></Row>
     </TableFooter>
   </CartTableContainer>
  )
}

export default CartTable
