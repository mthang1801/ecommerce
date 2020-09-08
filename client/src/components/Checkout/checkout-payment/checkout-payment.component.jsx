import React, { useState, useEffect } from "react";
import {
  Select,
  Option,
  Button,
  CheckoutPaymentWrapper,
  Label,
  FormGroup,
  CheckoutEmpty,
} from "./checkout-payment.styles";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  clearCartItems,
  orderedDetail,
  setMethodDelivery,
} from "../../../redux/cart/cart.actions";
import {
  selectMethodDelivery,
  selectTotalFeeShip,
  selectFastDeliveryCost,
  selectTotalPrice,
} from "../../../redux/cart/cart.selectors";
import StripeButton from "../../UI/stripe-button/stripe-button.component";
import { postCODPayment, postCardPayment } from "../../../utils/connectDB";
import { Redirect, withRouter } from "react-router-dom";
import Loader from "../../UI/loader/loader.component";

const CheckoutPayment = ({
  totalPrice,
  totalFeeShip,
  fastDeliveryCost,
  history,
  currentUser,
  cartItems,
  setError,
  orderedDetail,
  clearCartItems,
  setMethodDelivery,
  methodDelivery,
}) => {
  const [payMethod, setPayMethod] = useState("cod");
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const handleCODPayment = () => {
    setLoading(true);
    postCODPayment(
      currentUser,
      cartItems,
      methodDelivery,
      userMessage,
      totalPrice + totalFeeShip + fastDeliveryCost
    )
      .then((data) => {
        orderedDetail(data);
        clearCartItems();
        history.push("/checkout/complete");
      })
      .catch((err) => setError(err.response.data.message));
  };

  useEffect(() => {
    if(stripeToken){
      postCardPayment(currentUser, cartItems, methodDelivery, userMessage, totalPrice+totalFeeShip+fastDeliveryCost, stripeToken)
      .then(data => {
        orderedDetail(data);
        clearCartItems();
        history.push("/checkout/complete");
      })
      .catch((err) => setError(err.response.data.message));
    }
  }, [stripeToken])
  if (loading) {
    return <Loader />;
  }
  if (!cartItems.length) {
    return (
      <CheckoutEmpty>
        <h4>Không có sản phẩm nào trong giỏ hàng</h4>
        <Button onClick={() => history.push("/")}>Quay lại trang chủ</Button>
      </CheckoutEmpty>
    );
  }
  return (
    <CheckoutPaymentWrapper>
      <FormGroup>
        <Label>Phương thức vận chuyển</Label>
        <Select
          value={methodDelivery}
          onChange={(e) => setMethodDelivery(e.target.value)}
        >
          <Option value="normal">
            Giao hàng bình thường (giao hàng trong 7 ngày)
          </Option>
          <Option value="fast">Giao hàng nhanh (giao hàng trong 24h)</Option>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Phương thức thanh toán (*)</Label>
        <Select
          value={payMethod}
          onChange={(e) => setPayMethod(e.target.value)}
        >
          <Option value="cod">Tiền mặt (COD)</Option>
          <Option value="paypal">Thanh toán qua thẻ</Option>
        </Select>
      </FormGroup>
      <FormGroup>
        <textarea
          value={userMessage}
          style={{
            width: "100%",
            height: "5rem",
            padding: "0.75rem 1.25rem",
            resize: "none",
          }}
          placeholder="Để lại lời nhắn của bạn"
          onChange={(e) => setUserMessage(e.target.value)}
        />
      </FormGroup>
      {payMethod === "cod" ? (
        <Button onClick={handleCODPayment}>Hoàn tất</Button>
      ) : payMethod === "paypal" ? (
        <StripeButton        
          totalPrice={totalPrice+totalFeeShip+fastDeliveryCost}          
          setStripeToken={setStripeToken}
        />
      ) : null}
    </CheckoutPaymentWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  methodDelivery: selectMethodDelivery,
  totalFeeShip: selectTotalFeeShip,
  fastDeliveryCost: selectFastDeliveryCost,
  totalPrice: selectTotalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  orderedDetail: (ordered) => dispatch(orderedDetail(ordered)),
  clearCartItems: () => dispatch(clearCartItems()),
  setMethodDelivery: (method) => dispatch(setMethodDelivery(method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckoutPayment));
