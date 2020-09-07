import React from "react";
import {
  CartSummaryContainer,
  Label,
  Grid,
  CartKey,
  CartValue,
  CheckoutButton,
} from "./cart-summary.styles";
import {
  selectTotalPrice,
  selectCountItem,
  selectTotalFeeShip,
} from "../../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import { connect, ReactReduxContext } from "react-redux";
import { withRouter } from "react-router-dom";
const CartSummary = ({
  mobileView,
  tabletView,
  totalPrice,
  countItem,
  history,
  totalFeeShip,
}) => {
  return (
    <CartSummaryContainer>
      <Label>Tóm tắt hóa đơn</Label>
      <Grid>
        <CartKey>Số đơn hàng</CartKey>
        <CartValue>
          <span style={{ fontWeight: "bold" }}>{countItem}</span>
        </CartValue>
      </Grid>
      <Grid>
        <CartKey>Số tiền thanh toán</CartKey>
        <CartValue>
          <span style={{ fontWeight: "bold" }}>
            {totalPrice.toLocaleString("es-AR")}
          </span>
        </CartValue>
      </Grid>
      {totalFeeShip ? (
        <React.Fragment>
          <Grid>
            <CartKey>Phí vận chuyển</CartKey>
            <CartValue>
              <span style={{ fontWeight: "bold" }}>
                {totalFeeShip.toLocaleString("es-AR")}
              </span>
            </CartValue>
          </Grid>
          <Grid>
            <CartKey>Tổng tiền</CartKey>
            <CartValue>
              <span style={{ fontWeight: "bold" }}>
                {(totalPrice + totalFeeShip).toLocaleString("es-AR")}
              </span>
            </CartValue>
          </Grid>
        </React.Fragment>
      ) : null}

      <CheckoutButton
        mobileView={mobileView}
        tabletView={tabletView}
        onClick={() => history.push("/checkout")}
      >
        tiến hành thanh toán
      </CheckoutButton>
    </CartSummaryContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  countItem: selectCountItem,
  totalPrice: selectTotalPrice,
  totalFeeShip: selectTotalFeeShip,
});

export default connect(mapStateToProps)(withRouter(CartSummary));
