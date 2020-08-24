import React from 'react'
import {BackdropContainer} from "./backdrop.styles";
import {setCloseDrawer} from "../../../redux/drawer/drawer.actions";
import {connect} from "react-redux";
const Backdrop = ({setCloseDrawer, show}) => {
  return (
    <BackdropContainer onClick={setCloseDrawer} show={show} />
  )
}

const mapDispatchToProps = (dispatch) => ({
  setCloseDrawer: () => dispatch(setCloseDrawer()),
});

export default connect(null, mapDispatchToProps)(Backdrop)
