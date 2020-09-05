import React, { useState, useEffect, useContext } from "react";
import {
  CheckoutOverviewContainer,
  Title,
  CheckoutPreview,
  Grid,
} from "./checkout-overview.styles";
import EditUserForm from "../edit-user-form/edit-user-form.component";
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
const CheckoutOverview = ({ currentUser, match, countItem, loading }) => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [tabletView, setTabletView] = useState(
    window.innerWidth < 992 && window.innerWidth >= 768
  );
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
  const [toggleEditUserForm, setToggleEditUserForm] = useState(false);
  useEffect(() => {
    console.log(currentUser);
    if (
      !loading &&
      currentUser &&
      currentUser.information &&
      currentUser.information.lastname &&
      currentUser.information.firstname &&
      currentUser.information.email &&
      currentUser.information.address &&
      currentUser.city &&
      currentUser.district &&
      currentUser.ward &&
      currentUser.phone
    ) {
      setToggleEditUserForm(true);
    } else {
      setToggleEditUserForm(false);
    }
  }, [currentUser, loading]);
  if (!currentUser) {
    return <Redirect to={{ pathname: "/auth", state: { from: match.path } }} />;
  }
  if (countItem === 0) {
    return (
      <h2>Bạn chưa chọn sản phẩm vào giỏ hàng để tiến hành thanh toán.</h2>
    );
  }
  return (
    <CheckoutOverviewContainer>
      <Title>Billing Details</Title>
      <CheckoutPreview mobileView={mobileView} tabletView={tabletView}>
        <Grid w60 mobileView={mobileView} tabletView={tabletView}>
          {toggleEditUserForm ? (
            <EditUserForm currentUser={currentUser} />
          ) : (
            <CheckoutForm
              show={toggleEditUserForm}
              currentUser={currentUser}
              setToggleEditUserForm={() => setToggleEditUserForm(true)}
            />
          )}
        </Grid>
        {/* <Grid mobileView={mobileView} tabletView={tabletView}>
          <OrderForm />
        </Grid> */}
      </CheckoutPreview>
    </CheckoutOverviewContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  countItem: selectCountItem,
  loading: selectUserLoading,
});
export default connect(mapStateToProps)(withRouter(CheckoutOverview));
