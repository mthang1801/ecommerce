import React from "react";
import { CheckoutPageContainer } from "./checkout.styles";
import CheckoutOverview from "../../components/Checkout/checkout-overview/checkout-overview.component";
import Background from "../../components/Layout/background/background.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import CheckoutForm from "../../components/Checkout/check-out-form/check-out-form.component";
import UpdateForm from "../../components/Checkout/update-user-form/update-user-form.component";
import { Route, Redirect, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserLoading,
} from "../../redux/user/user.selectors";
import CheckoutComplete from "../../components/Checkout/checkout-complete/checkout-complete.component"
import PageNotFound from "../page-error/page-error.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
const CheckoutPage = ({ match, currentUser, loading, cartItems }) => {
  const checkOutFormContition = (user) => {
    if (!user) {
      return false;
    }
    const {
      first_name,
      last_name,
      city,
      district,
      ward,
      address,
      email,
      phone,
    } = user.information;
    if (
      !first_name ||
      !last_name ||
      !city ||
      !district ||
      !ward ||
      !address ||
      !email ||
      !phone
    ) {
      return false;
    }
    return true;
  };
  return (
    <CheckoutPageContainer>
      <MasterHeader />
      <Background label="Trang chủ/ Tiến hành thanh toán" />
      {!loading && currentUser ? (
        <Switch>           
           <Route
            path={`${match.path}/update-information`}
            exact
            render={(props) => (
              <UpdateForm {...props} currentUser={currentUser} />
            )}
          />     
          <Route
            path={`${match.path}`}
            exact
            render={(props) =>
              checkOutFormContition(currentUser) ? (
                <CheckoutOverview {...props} currentUser={currentUser} />
              ) : (
                <Redirect to={`${match.path}/update-information`} />
              )
            }
          />
          <Route
              path={`${match.path}/complete`}
              exact
              component={CheckoutComplete}
              />
         <Route path="*" component={PageNotFound}/>
        </Switch>
      ) : <Redirect to={{pathname : "/auth", state : {from : match.url}}}/>}
    </CheckoutPageContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems,
  loading: selectUserLoading,
});
export default connect(mapStateToProps)(CheckoutPage);
