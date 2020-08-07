import React from 'react'
import {CheckoutOverviewContainer,Title, CheckoutPreview, Grid} from "./checkout-overview.styles";
import CheckoutForm from "../checkout-form/checkout-form.component";
import OrderForm from "../order-form/order-form.component";
const CheckoutOverview = () => {
  return (
    <CheckoutOverviewContainer>
      <Title>Billing Details</Title>
      <CheckoutPreview>
        <Grid w60>
          <CheckoutForm/>
        </Grid>
        <Grid>
          <OrderForm/>
        </Grid>
      </CheckoutPreview>
    </CheckoutOverviewContainer>
  )
}

export default CheckoutOverview