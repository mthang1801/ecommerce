import React from "react";
import {
  OrderFormContainer,
  Title,
  OrderList,
  Row,
  Grid,
  Strong,
  Paragraph,
} from "./order-form.styles";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectTotalPrice, selectTotalFeeShip, selectFastDeliveryCost} from "../../../redux/cart/cart.selectors"
const OrderForm = React.forwardRef( ({cartItems, totalPrice, totalFeeShip, fastDeliveryCost}, ref)  => {
  
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
            <Strong>Phí vận chuyển {fastDeliveryCost > 0 ? "(giao nhanh)" :""}</Strong>
          </Grid>
          <Grid>
            {" "}
            <Strong total>{(totalFeeShip + fastDeliveryCost).toLocaleString("es-AR")}</Strong>
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
            <Strong total>{(totalPrice+totalFeeShip+fastDeliveryCost).toLocaleString("es-AR")}</Strong>
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
  totalFeeShip : selectTotalFeeShip,
  fastDeliveryCost : selectFastDeliveryCost
})
export default connect(mapStateToProps)(OrderForm);
