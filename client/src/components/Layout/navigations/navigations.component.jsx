import React, {useContext,useEffect, useRef} from 'react';
import AppContext from "../../../context/app-viewport.context";
import {DesktopContainer,LeftSide, MidSide, RightSide, Row, SmallerViewPort } from "./navigations.styles";
import NavigationItems from "../navigation-items/navigation-items.component";
import Brand from "../navigation-brand/navigation-brand.component";
import Widget from "../navigation-widget/navigation-widget.component";
import ToggleDrawer from "../header/toggle-drawer/toggle-drawer.component";
import {createStructuredSelector} from "reselect";
import { selectCartShow} from "../../../redux/cart/cart.selectors"
import {connect} from "react-redux"
import {setCartCheckoutPosition} from "../../../redux/cart/cart.actions";
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
const Header = ({setOpenDrawer, setCartCheckoutPosition, cartShow}) => {  
  const width = useContext(AppContext)
  const cartRef = useRef(null)
  useEffect(() => {
    if(cartRef.current){      
      setCartCheckoutPosition(cartRef.current.offsetTop)
    }
  },[cartRef.current])
  if(width > 992)
  // for Desktop
    return (
      <DesktopContainer ref={cartRef}>
        <LeftSide>
          <Brand/>
        </LeftSide>
        <MidSide>
          <NavigationItems/>
        </MidSide>
        <RightSide>        
          <Widget />
        </RightSide>
        {cartShow && <CartDropdown/>}
      </DesktopContainer>
    )
  return (
  //for Tablets, mobile
    <SmallerViewPort ref={cartRef}>
      <Row justifyBetween>
        <Brand />
        <ToggleDrawer/>
      </Row>
      <Row justifyCenter>
        <Widget />
        {cartShow && <CartDropdown/>}
      </Row>
     
    </SmallerViewPort>
  )
}

const mapStateToProps = createStructuredSelector({
  cartShow : selectCartShow
})

const mapDispatchToProps = dispatch => ({
  setCartCheckoutPosition : position => dispatch(setCartCheckoutPosition(position))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
