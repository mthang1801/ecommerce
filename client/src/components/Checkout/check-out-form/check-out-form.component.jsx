import React from "react";
import {
  CheckoutFormWrapper,
  Label,
  Button,
  ButtonLink,
  Form
} from "./check-out-form.styles"
import {withRouter} from "react-router-dom";
const CheckoutForm = ({ currentUser, show, history, match , showOrder, setShowOrder, showPayment, setShowPayment}) => {
  console.log(history)
  const handleCheckoutButton = () => {
    if(showOrder){
      setShowPayment();
    }else{
      setShowOrder()
    }
  }
  return (
    <CheckoutFormWrapper>
      <Form show={show}>
        <Label>Thông tin khách hàng</Label>
        <p>
          Tên khách hàng :{" "}
          <span
            style={{ fontWeight: "bold" }}
          >{`${currentUser.information.first_name} ${currentUser.information.last_name}`}</span>
        </p>
        <p>
          Địa chỉ :{" "}
          {`${currentUser.information.address}, phường ${currentUser.information.ward}, Quận ${currentUser.information.district}, ${currentUser.information.city}`}
        </p>
        <p>Email : {currentUser.information.email}</p>
        <p>Điện thoại : {currentUser.information.phone}</p>
        <ButtonLink
          onClick={() => history.push(`${match.path}/update-information`)}
        >
          Cập nhật thông tin
        </ButtonLink>
      </Form>
      {!showPayment && <Button onClick={handleCheckoutButton} style={{margin:"1rem auto"}}>{showOrder ? "Tiến hành thanh toán" : "Tiếp tục"} </Button> }
    </CheckoutFormWrapper>
  );
};

export default withRouter(CheckoutForm);
