import React from "react" ; 
import {SideDrawerContainer, DrawerMenu} from "./side-drawer.styles";
import Backdrop from "../../../UI/backdrop/backdrop.component";
import NavigationItems from "../../navigation-items/navigation-items.component";
import {createStructuredSelector} from "reselect";
import {selectOpenDrawer} from "../../../../redux/drawer/drawer.selectors";
import {connect} from "react-redux";
const SideDrawer = ({show}) => {
  return (
    <SideDrawerContainer show={show}>      
      <Backdrop/>
      <DrawerMenu show={show} >
        <NavigationItems onMobile/>
      </DrawerMenu>
    </SideDrawerContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  show : selectOpenDrawer
})


export default connect(mapStateToProps)(SideDrawer);