import React, { useState, useEffect, useContext, createRef } from "react";
import {
  CheckoutOverviewContainer,
  Title,
  CheckoutPreview,
  Grid,
} from "./checkout-overview.styles";
import UpdateUserForm from "../update-user-form/update-user-form.component";
import CheckoutForm from "../check-out-form/check-out-form.component";

import OrderForm from "../order-form/order-form.component";
import AppContext from "../../../context/app-viewport.context";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserLoading,
} from "../../../redux/user/user.selectors";
import { selectCountItem } from "../../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import CheckoutPayment from "../checkout-payment/checkout-payment.component";
import { selectCartItems } from "../../../redux/cart/cart.selectors";
const CheckoutOverview = ({
  currentUser,
  history,
  match,
  countItem,
  loading,
  cartItems,
}) => {
  const [showOrder, setShowOrder] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [error, setError] = useState(null)
  const [tabletView, setTabletView] = useState(
    window.innerWidth < 992 && window.innerWidth >= 768
  );
  const orderFormRef = createRef(null);
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
    if (orderFormRef.current) {
      window.scrollTo({
        top: orderFormRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [width, orderFormRef]);
  if(!cartItems.length){
    return <Redirect to="/" />;
  }
  return (
    <CheckoutOverviewContainer>
      <CheckoutPreview mobileView={mobileView} tabletView={tabletView}>
        <Grid w60 mobileView={mobileView} tabletView={tabletView}>
          {error ? <h4 style={{margin: "1.5rem", color : "#dd2222"}}>{error}</h4> : null}
          <CheckoutForm            
            currentUser={currentUser}
            showOrder={showOrder}
            setShowOrder={() => setShowOrder(true)}
            showPayment={showPayment}
            setShowPayment={() => setShowPayment(true)}
          />
          {currentUser && cartItems && showPayment && (
            <CheckoutPayment currentUser={currentUser} cartItems={cartItems} setError={err => setError(err)}/>
          )}
        </Grid>
        {showOrder && (
          <Grid mobileView={mobileView} tabletView={tabletView}>
            <OrderForm ref={orderFormRef} />
          </Grid>
        )}
      </CheckoutPreview>
    </CheckoutOverviewContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  countItem: selectCountItem,
  loading: selectUserLoading,
  cartItems: selectCartItems,
});
export default connect(mapStateToProps)(withRouter(CheckoutOverview));
