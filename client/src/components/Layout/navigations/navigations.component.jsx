import React, {useContext} from 'react';
import AppContext from "../../../context/app-viewport.context";
import {DesktopContainer,LeftSide, MidSide, RightSide, Row, SmallerViewPort } from "./navigations.styles";
import NavigationItems from "../navigation-items/navigation-items.component";
import Brand from "../navigation-brand/navigation-brand.component";
import Widget from "../navigation-widget/navigation-widget.component";
import ToggleDrawer from "../header/toggle-drawer/toggle-drawer.component";
const Header = ({setOpenDrawer}) => {  
  const width = useContext(AppContext)
  
  if(width > 992)
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


export default Header
