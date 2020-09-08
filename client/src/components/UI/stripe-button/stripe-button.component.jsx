import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {Button} from "../../Checkout/checkout-button/checkout-button.styles";
const StripeButton = ({totalPrice, setStripeToken }) => {
  const publish_key =
    "pk_test_GqeDNGLAbXcAnQ8xs8OAzKcW00uS9xIftb";
  const priceForStripe = (totalPrice) * 1000; //based on cents
  const onToken = async (token) => {
    setStripeToken(token);
  };
  return (
    <StripeCheckout
      name="Ecommerce"
      description={`Số tiền thanh toán ${totalPrice.toLocaleString("es-AR")}`}
      image="https://svgshare.com/i/CUz.svg"
      panelLabel="Thanh toán ngay"
      amount={priceForStripe}
      currency="VND"
      locale="vi"
      stripeKey={publish_key}
      shippingAddress
      billingAddress
      zipCode={false}
      token={onToken}
      allowRememberMe
      label="Thanh toán qua thẻ"
    >
      <Button>Hoàn tất</Button>
    </StripeCheckout>
  );
};

export default StripeButton;
