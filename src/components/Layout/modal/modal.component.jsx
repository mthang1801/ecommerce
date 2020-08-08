import React from 'react'
import {ModalContainer} from "./modal.styles";
import {setCloseDrawer} from "../../../redux/drawer/drawer.actions";
import {connect} from "react-redux";
const Modal = ({setCloseDrawer}) => {
  return (
    <ModalContainer onClick={setCloseDrawer} />
  )
}

const mapDispatchToProps = (dispatch) => ({
  setCloseDrawer: () => dispatch(setCloseDrawer()),
});

export default connect(null, mapDispatchToProps)(Modal)
