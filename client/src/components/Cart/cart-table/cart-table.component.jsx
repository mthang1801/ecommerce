import React from "react";
import {
  CartTableContainer,
  TableHeader,
  Row,
  TableBody,
  TableRow,
  Image,
  Name,
  BtnRemove,
  TableFooter,
  Button,
} from "./cart-table.styles";
import { getCartItems } from "../../../utils/connectDB";
const CartTable = ({ mobileView, tabletView }) => {
  const cartItems = getCartItems();

  return (
    <CartTableContainer mobileView={mobileView} tabletView={tabletView}>
      <TableHeader mobileView={mobileView} tabletView={tabletView}>
        <Row product>Mặt Hàng</Row>
        <Row>Đơn Giá</Row>
        <Row>Số lượng</Row>
        <Row>Giảm giá</Row>
        <Row>Thành tiền</Row>
        <Row></Row>
      </TableHeader>
      <TableBody mobileView={mobileView} tabletView={tabletView}>
        {cartItems.map((cart) => (
          <TableRow key={cart._id}>
            <Row product>
              {!mobileView && !tabletView && <Image src={cart.imageUrl} />}
              <Name>{cart.name}</Name>
            </Row>
            <Row>{cart.price.toLocaleString("es-AR")}</Row>
            <Row>
              <Button>&#10094;</Button>
              {cart.quantity}
              <Button>&#10095;</Button>
            </Row>
            <Row>{cart.discount}%</Row>
            <Row>
              {(
                (cart.price * cart.quantity * (100 - cart.discount)) /
                100
              ).toLocaleString("es-AR")}
            </Row>
            <Row>
              <BtnRemove>&times;</BtnRemove>
            </Row>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter mobileView={mobileView} tabletView={tabletView}>
        <Row product></Row>
        <Row></Row>
        <Row></Row>
        <Row style={{width: mobileView || tabletView ?  "30%" : "auto", fontSize : "0.9em", textAlign : "right"}}>
          <strong>Tổng tiền</strong>
        </Row>
        <Row totalPrice>
          {cartItems
            .reduce(
              (acc, item) =>
                acc +
                (item.price * item.quantity * (100 - item.discount)) / 100,
              0
            )
            .toLocaleString("es-AR")}
        </Row>
        <Row></Row>
      </TableFooter>
    </CartTableContainer>
  );
};

export default CartTable;
