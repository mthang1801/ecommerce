import React from "react";
import {
  CartTableContainer,
  ProductImage,
  BtnActions,
  Row,
  ButtonLink,  
  TableRow,
  Column,
  Image,
  Name,
  TableFooter,
  Button,
  ProductActionsChange,
  Quantity,
  TextContent,
  UnitPrice,
  TotalPrice
} from "./cart-table.styles";
import {createStructuredSelector} from "reselect";
import {selectCartItems} from "../../../redux/cart/cart.selectors";
import {connect} from "react-redux";
import {increaseItem, decreaseItem, removeItem} from "../../../redux/cart/cart.actions"
const CartTable = ({ mobileView, tabletView, cartItems, increaseItem, decreaseItem, removeItem }) => {

  return (
    <CartTableContainer mobileView={mobileView} tabletView={tabletView}>
      {cartItems.length ? cartItems.map((cart) => {
        console.log(cart);
        return  <TableRow key={cart._id}>
        <ProductImage>
          <Image src={`data:${cart.image.mimetype};base64,${cart.image.data}`} alt={cart.image.name} />
        </ProductImage>        
        <TextContent>
          <Column mobileView={mobileView} tabletView={tabletView} w40>
            <Name>{cart.name}</Name>
            <p>
              {" "}
              cung cấp bởi : <a href="#">{cart.creator}</a>
            </p>
            <p>Còn {cart.store_quantity} sản phẩm.</p>
            <BtnActions>
              <ButtonLink onClick={() => removeItem(cart._id)}>Xóa</ButtonLink>
              <ButtonLink>Thêm vào DS mua sau</ButtonLink>
            </BtnActions>
          </Column>
          <Column w30 style={{justifyContent : "flex-start"}}>
            {cart.discount > 0 && <p style={{ color: "#dd2222" }}>Khuyến mãi : {cart.discount}%</p>}
            <UnitPrice>{cart.price.toLocaleString("es-AR")}</UnitPrice>
            <ProductActionsChange>
              <Button onClick={() => decreaseItem(cart._id)}>-</Button>
              <Quantity>{cart.quantity}</Quantity>
              <Button onClick={() => increaseItem(cart._id)}>+</Button>
            </ProductActionsChange>
          </Column>
          <Column>
            <TotalPrice>{cart.discount > 0 ? (cart.price*cart.quantity*(100-cart.discount)/100).toLocaleString("es-AR")  : (cart.price * cart.quantity).toLocaleString("es-AR")}</TotalPrice>
          </Column>
        </TextContent>          
      </TableRow>
      }) : null }     
    </CartTableContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems : selectCartItems
})
const mapDispatchToProps = dispatch => ({
  increaseItem : (id) => dispatch(increaseItem(id)) , 
  decreaseItem : (id) => dispatch(decreaseItem(id)),
  removeItem : (id) => dispatch(removeItem(id))
})
export default connect(mapStateToProps, mapDispatchToProps)(CartTable);
