import React, {useEffect, useState, useContext} from 'react'
import {CartOverViewContainer,Row, Grid} from "./cart-overview.styles";
import CartTable from "../cart-table/cart-table.component";
import CartCheckout from "../cart-checkout/cart-checkout.component";
import AppContext from "../../../context/app-viewport.context";
import {createStructuredSelector} from "reselect";
import {selectCountItem} from "../../../redux/cart/cart.selectors";
import {connect} from "react-redux";
const CartOverView = ({countItem}) => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 700);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 700);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 700) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 700) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  if(countItem === 0)
  return <h2 style={{textAlign:"center", margin : "3rem auto"}}>Không có sản phẩm nào trong giỏ hàng.</h2>
  return (
    <CartOverViewContainer mobileView={mobileView} tabletView={tabletView}>
      <Row mobileView={mobileView} tabletView={tabletView}>
        <Grid w70 mobileView={mobileView} tabletView={tabletView}>
          <CartTable mobileView={mobileView} tabletView={tabletView}/>  
        </Grid>
        <Grid mobileView={mobileView} tabletView={tabletView}>
          <CartCheckout mobileView={mobileView} tabletView={tabletView}/> 
        </Grid>
      </Row>           
    </CartOverViewContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  countItem : selectCountItem
})

export default connect(mapStateToProps)(CartOverView);
