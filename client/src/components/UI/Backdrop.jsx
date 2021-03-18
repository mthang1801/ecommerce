import React from 'react'
import {BackdropContainer} from "./styles/Backdrop.styles";
import {setCloseDrawer} from "../../redux/drawer/drawer.actions";
const Backdrop = ({setCloseDrawer, show, onClick}) => {
  console.log(show)
  const handleClick = () => {
    if(setCloseDrawer){
      setCloseDrawer();
    }
    if(onClick){
      onClick();
    }    
  }
  return (
    <BackdropContainer onClick={handleClick} show={show} />
  )
}

export default Backdrop
