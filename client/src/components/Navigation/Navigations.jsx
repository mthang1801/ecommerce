import React, { useContext, useEffect, useRef } from "react";
import AppContext from "../../context/app-viewport.context";
import {
  DesktopContainer,
  LeftSide,
  MidSide,
  RightSide,
  Row,
  SmallerViewPort,
} from "./styles/Navigations.styles";
import NavigationItems from "./NavigationItems";
import Brand from "./NavigationBrand";
import NavigationNotification from "./NavigationNotification";
import ButtonToggleDrawer from "../Controls/ButtonToggleDrawer";
import { createStructuredSelector } from "reselect";
import { selectCartShow } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { setCartCheckoutPosition } from "../../redux/cart/cart.actions";
import CartDropdown from "../Cart/CartDropdown";
const Header = ({ setOpenDrawer, setCartCheckoutPosition, cartShow }) => {  
  const cartRef = useRef(null);
  useEffect(() => {
    if (cartRef.current) {
      setCartCheckoutPosition(cartRef.current.offsetTop);
    }
  }, [cartRef.current]);
 
    
    return (
      <>
          {/* for Desktop */}
        <DesktopContainer ref={cartRef}>
          <LeftSide>
            <Brand />
          </LeftSide>
          <MidSide>
            <NavigationItems />
          </MidSide>
          <RightSide>
            <NavigationNotification />
          </RightSide>
          {cartShow && <CartDropdown />}
        </DesktopContainer>
        {/* for Tablets, mobile */}
        <SmallerViewPort ref={cartRef}>
          <Row justifyBetween>
            <Brand />
            <ButtonToggleDrawer />
          </Row>
          <Row justifyCenter>
            <NavigationNotification />
            {cartShow && <CartDropdown />}
          </Row>
        </SmallerViewPort>
      </>
    );
};

const mapStateToProps = createStructuredSelector({
  cartShow: selectCartShow,
});

const mapDispatchToProps = (dispatch) => ({
  setCartCheckoutPosition: (position) =>
    dispatch(setCartCheckoutPosition(position)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
