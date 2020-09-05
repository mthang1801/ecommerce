import React from "react";
import {
  CartTableContainer,
  ProductImage,
  BtnActions,
  Row,
  TableRow,
  TableBody,
  Image,
  Name,
  BtnRemove,
  TableFooter,
  Button,
  ProductInfo,
} from "./cart-table.styles";
import { getCartItems } from "../../../utils/connectDB";
const CartTable = ({ mobileView, tabletView }) => {
  const cartItems = getCartItems();

  return (
    <CartTableContainer mobileView={mobileView} tabletView={tabletView}>
      {cartItems.map((cart) => (
        <TableRow key={cart._id}>
          {!mobileView && !tabletView && (
            <ProductImage>
              <Image src={cart.imageUrl} />
            </ProductImage>
          )}
          <ProductInfo mobileView={mobileView} tabletView={tabletView}>
            <Name>{cart.name}</Name>
            <p> cung cấp bởi : <a href="#">Mai Van Thang</a></p>
            <p>Chỉ còn 5 sản phẩm</p>
            <BtnActions>
              <BtnRemove>Xóa</BtnRemove>
            </BtnActions>
          </ProductInfo>
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
      <TableFooter mobileView={mobileView} tabletView={tabletView}>
        <Row product></Row>
        <Row></Row>
        <Row></Row>
        <Row
          style={{
            width: mobileView || tabletView ? "30%" : "auto",
            fontSize: "0.9em",
            textAlign: "right",
          }}
        >
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
