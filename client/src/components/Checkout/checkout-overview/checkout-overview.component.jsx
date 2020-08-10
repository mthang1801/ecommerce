import React, {useState, useEffect, useContext} from 'react'
import {CheckoutOverviewContainer,Title, CheckoutPreview, Grid} from "./checkout-overview.styles";
import CheckoutForm from "../checkout-form/checkout-form.component";
import OrderForm from "../order-form/order-form.component";
import AppContext from "../../../context/app-viewport.context";
const CheckoutOverview = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 768);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 768) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  return (
    <CheckoutOverviewContainer>
      <Title>Billing Details</Title>
      <CheckoutPreview mobileView={mobileView} tabletView={tabletView}>
        <Grid w55 mobileView={mobileView} tabletView={tabletView}>
          <CheckoutForm/>
        </Grid>
        <Grid mobileView={mobileView} tabletView={tabletView}>
          <OrderForm/>
        </Grid>
      </CheckoutPreview>
    </CheckoutOverviewContainer>
  )
}

export default CheckoutOverview