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
const OrderForm = () => {
  return (
    <OrderFormContainer>
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
        <Row>
          <Grid>Vegetable’s Package</Grid>
          <Grid>
            <Strong price>300.000 VND</Strong>
          </Grid>
        </Row>
        <Row>
          <Grid>Fresh Vegetable</Grid>
          <Grid>
            <Strong price>150.000 VND</Strong>
          </Grid>
        </Row>
        <Row>
          <Grid>Organic Bananas</Grid>
          <Grid>
            <Strong price>450.000 VND</Strong>
          </Grid>
        </Row>
      </OrderList>
      <OrderList>
        <Row>
          <Grid>
            {" "}
            <Strong>Tổng tiền trước thuế</Strong>
          </Grid>
          <Grid>
            {" "}
            <Strong>900.000</Strong>
          </Grid>
        </Row>
      </OrderList>
      <OrderList>
        <Row>
          <Grid>
            <Strong>Thuế VAT</Strong>
          </Grid>
          <Grid>
            <Strong>10%</Strong>{" "}
          </Grid>
        </Row>
      </OrderList>
      <OrderList>
        <Row>
          <Grid>
            <Strong>Tổng tiền sau thuế</Strong>
          </Grid>
          <Grid>
            {" "}
            <Strong total>990.000</Strong>
          </Grid>
        </Row>
      </OrderList>
      <Paragraph>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur tenetur ad aut harum magnam at? Earum placeat incidunt repellendus libero saepe sed quasi illo, mollitia ipsam quia assumenda consequatur repudiandae.</Paragraph>
      <CheckoutBtn>Tiến hành đặt hàng</CheckoutBtn>
    </OrderFormContainer>
  );
};

export default OrderForm;
