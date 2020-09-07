import React from "react";
import {
  OrderFormContainer,
  Title,
  OrderList,
  Row,
  Grid,
  Strong,
  Paragraph,
  CheckoutBtn
} from "./order-form.styles";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectTotalPrice, selectTotalFeeShip} from "../../../redux/cart/cart.selectors"
const OrderForm = React.forwardRef( ({cartItems, totalPrice, totalFeeShip}, ref)  => {

  return (
    <OrderFormContainer ref={ref}>
      <Title>Đơn thanh toán</Title>
      <OrderList>
        <Row>
          <Grid>
            <Strong>Mặt hàng</Strong>
          </Grid>
          <Grid>
            <Strong>Đơn giá</Strong>
          </Grid>
        </Row>
        {cartItems && cartItems.map((item) => (
          <Row key={item._id}>
            <Grid>{item.name}</Grid>
            <Grid>
              <Strong price>{item.discount ? (item.price * (100-item.discount) * item.quantity/100).toLocaleString("es-AR") : (item.quantity * item.price).toLocaleString("es-AR")}</Strong>
            </Grid>
          </Row>
        ))}                
      </OrderList>      
      <OrderList>
        <Row>
          <Grid>
            <Strong>Tổng tiền SP</Strong>
          </Grid>
          <Grid>
            {" "}
            <Strong total>{totalPrice.toLocaleString("es-AR")}</Strong>
          </Grid>
        </Row>
      </OrderList>
      <OrderList>
        <Row>
          <Grid>
            <Strong>Phí vận chuyển</Strong>
          </Grid>
          <Grid>
            {" "}
            <Strong total>{totalPrice < 1000000 ? totalFeeShip.toLocaleString("es-AR") : 0}</Strong>
          </Grid>
        </Row>
      </OrderList>
      <OrderList>
        <Row>
          <Grid>
            <Strong>Tổng tiền thanh toán</Strong>
          </Grid>
          <Grid>
            {" "}
            <Strong total>{totalPrice < 1000000 ?  (totalPrice+totalFeeShip).toLocaleString("es-AR") : totalPrice.toLocaleString("es-AR") }</Strong>
          </Grid>
        </Row>
      </OrderList>
      <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur tenetur ad aut harum magnam at? Earum placeat incidunt repellendus libero saepe sed quasi illo, mollitia ipsam quia assumenda consequatur repudiandae.</Paragraph>     
    </OrderFormContainer>
  );
});
const mapStateToProps = createStructuredSelector({
  cartItems : selectCartItems,
  totalPrice : selectTotalPrice,
  totalFeeShip : selectTotalFeeShip
})
export default connect(mapStateToProps)(OrderForm);
