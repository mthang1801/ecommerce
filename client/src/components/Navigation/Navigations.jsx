import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  DesktopContainer,
  LeftSide,
  MidSide,
  RightSide,
  Row,
  SmallerViewPort,
} from "./styles/Navigations.styles";
import NavigationItems from "./NavigationItems";
import ButtonToggleCategoryBoard from "../Controls/ButtonToggleCategoryBoard";
import NavigationNotification from "./NavigationNotification";
import { createStructuredSelector } from "reselect";
import { selectCartShow } from "../../redux/cart/cart.selectors";
import { connect } from "react-redux";
import { setCartCheckoutPosition } from "../../redux/cart/cart.actions";
import CartDropdown from "../Cart/CartDropdown";
import CategoryMenuBoard from "../Portfolio/PortfolioMenuBoard";
import Backdrop from "../UI/Backdrop";
const Header = ({ setCartCheckoutPosition, cartShow }) => {
  const [openBoard, setOpenBoard] = useState(false);
  const cartRef = useRef(null);
  useEffect(() => {
    if (cartRef.current) {
      setCartCheckoutPosition(cartRef.current.offsetTop);
    }
  }, [cartRef.current]);

  const onMouseEnterButton = useCallback((e) => {  
    setOpenBoard(true);
  }, []);
  const onMouseLeaveButton = useCallback(() => {
    setOpenBoard(false);
  }, []);
  const onClickBackdrop = useCallback(() => {
    setOpenBoard(false);
  }, []);  
  return (
    <>
      <Backdrop show={openBoard} onClick={onClickBackdrop} />
      
      {/* for Desktop */}
      <DesktopContainer ref={cartRef}>
        <LeftSide
          onMouseEnter={onMouseEnterButton}
          style={{zIndex:1000}}
          onMouseLeave={onMouseLeaveButton}          
        >
          <ButtonToggleCategoryBoard active={openBoard}/>
          <CategoryMenuBoard open={openBoard}/>
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
