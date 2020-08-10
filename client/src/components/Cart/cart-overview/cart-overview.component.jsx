import React, {useEffect, useState, useContext} from 'react'
import {CartOverViewContainer} from "./cart-overview.styles";
import CartTable from "../cart-table/cart-table.component";
import CartCheckout from "../cart-checkout/cart-checkout.component";
import CartActions from "../cart-actions/cart-actions.component";
import AppContext from "../../../context/app-viewport.context";
const CartOverView = () => {
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
    <CartOverViewContainer mobileView={mobileView} tabletView={tabletView}>
      <CartTable mobileView={mobileView} tabletView={tabletView}/>
      <CartActions  mobileView={mobileView} tabletView={tabletView}/>
      <CartCheckout mobileView={mobileView} tabletView={tabletView}/>
    </CartOverViewContainer>
  )
}

export default CartOverView
