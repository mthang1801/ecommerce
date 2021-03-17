import React from "react";
import {ToggleDrawerContainer, Dash} from "./styles/ButtonToggleDrawer.styles";
import {setOpenDrawer} from "../../redux/drawer/drawer.actions";
import {connect} from "react-redux";

const ToggleDrawer = ({setOpenDrawer}) => {  
  return (
    <ToggleDrawerContainer onClick={setOpenDrawer} >
      <Dash/>
      <Dash/>
      <Dash/>
    </ToggleDrawerContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  setOpenDrawer : () => dispatch(setOpenDrawer())
})

export default connect(null, mapDispatchToProps)(ToggleDrawer);