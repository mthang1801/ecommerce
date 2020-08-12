import React, {useEffect} from "react";
import {BackdropWrapper} from "./backdrop.styles";
const Backdrop = ({close, show}) => { 
  useEffect(() => {    
    function detectEscapeButton(e){
      if(e.keyCode == 27){
        close();
      }
    }
    document.addEventListener("keydown", detectEscapeButton);
    return  () => document.removeEventListener("keydown", detectEscapeButton);
  },[])
  return <BackdropWrapper show={show} onClick={close}/>
}

export default Backdrop