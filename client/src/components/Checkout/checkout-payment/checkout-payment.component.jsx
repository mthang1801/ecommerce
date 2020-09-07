import React, { useState } from "react";
import {
  Select,
  Option,
  Button,
  CheckoutPaymentWrapper,
  Label,
  FormGroup
} from "./checkout-payment.styles";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { orderedDetail} from "../../../redux/ordered/ordered.actions"
import { clearCartItems} from "../../../redux/cart/cart.actions"
import { postCODPayment } from "../../../utils/connectDB";
import {Redirect, withRouter} from "react-router-dom";
import Loader from "../../UI/loader/loader.component"
const CheckoutPayment = ({ history, location, currentUser, cartItems, setError, orderedDetail, clearCartItems }) => {
  const [payMethod, setPayMethod] = useState("cod");
  const [userMessage, setUserMessage] = useState("");
  const [methodDelivery, setMethodDelivery] = useState("normal");
  const [loading, setLoading] = useState(false);
  const handleCODPayment = () => {
    setLoading(true);
    postCODPayment(currentUser, cartItems, methodDelivery, userMessage)
    .then(data => {           
      orderedDetail(data);
      // clearCartItems();    
    })
    .catch(err => setError(err.response.data.message));
    history.replace("/ordered/complete")
  };
  if(loading){
    return <Loader/>
  }
  return (
    <CheckoutPaymentWrapper>
      <FormGroup>
        <Label>Phương thức vận chuyển</Label>
        <Select value={methodDelivery} onChange={(e) => setMethodDelivery(e.target.value)}>
          <Option value="normal">Giao hàng bình thường (giao hàng trong 7 ngày)</Option>
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
        <textarea value={userMessage} style={{width: "100%", height: "5rem", padding: "0.75rem 1.25rem", resize: "none"}} placeholder="Để lại lời nhắn của bạn" onChange={(e) => setUserMessage(e.target.value)}/>
      </FormGroup>
      {payMethod === "cod" ? (
        <Button onClick={handleCODPayment}>Hoàn tất</Button>
      ) : null}
    </CheckoutPaymentWrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  orderedDetail : (ordered) => dispatch(orderedDetail(ordered)),
  clearCartItems : () => dispatch(clearCartItems())
})

export default connect(null,mapDispatchToProps)(withRouter(CheckoutPayment));
