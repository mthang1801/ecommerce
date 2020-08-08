import React from 'react'
import {DesktopContainer,LeftSide, MidSide, RightSide, Row, SmallerViewPort } from "./navigations.styles";
import NavigationItems from "../navigation-items/navigation-items.component";
import {connect} from "react-redux";
import {selectIsMobile} from "../../../redux/checkViewPort/checkViewPort.selectors"
import {createStructuredSelector} from "reselect";
import Brand from "../navigation-brand/navigation-brand.component";
import Widget from "../navigation-widget/navigation-widget.component";
import ToggleDrawer from "../header/toggle-drawer/toggle-drawer.component";
const Header = ({setOpenDrawer, isMobile}) => {  
  if(!isMobile) 
  // for Desktop
    return (
      <DesktopContainer>
        <LeftSide>
          <Brand/>
        </LeftSide>
        <MidSide>
          <NavigationItems/>
        </MidSide>
        <RightSide>        
          <Widget/>
        </RightSide>
      </DesktopContainer>
    )
  return (
  //for Tablets, mobile
    <SmallerViewPort>
      <Row justifyBetween>
        <Brand />
        <ToggleDrawer/>
      </Row>
      <Row justifyCenter>
        <Widget/>
      </Row>
    </SmallerViewPort>
  )
}

const mapStateToProps = createStructuredSelector({
  isMobile : selectIsMobile
})


export default connect(mapStateToProps)(Header)
