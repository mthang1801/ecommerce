import React from "react";
import {
  CartItemContainer,
  CartItemContent,
  CartItemPrice,
  CartItemImageContainer,
  CartItemName,
  CartTotalPrice
} from "./styles/CartItem.styles";
const CartItem = ({ item: { image, name, price, quantity } }) => {

  return (
    <CartItemContainer placeholder={name}>
      <CartItemImageContainer
        src={`data:${image.mimetype};base64,${image.data}`}
        alt={image.name}
      />
      <CartItemContent>
        <CartItemName>{name}</CartItemName>
        <CartItemPrice>
          {price.toLocaleString("es-AR")} x {quantity}
        </CartItemPrice>
        <CartTotalPrice>
          Thành tiền : <span style={{color: "#dd2222"}}>{(price * quantity).toLocaleString("es-AR")} VND</span>
        </CartTotalPrice>
      </CartItemContent>
    </CartItemContainer>
  );
};

export default React.memo(CartItem);
