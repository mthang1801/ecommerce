import React, {useEffect} from "react";
import {ModalWrapper} from "./modal.styles";
const Modal = ({close, show}) => { 
  useEffect(() => {    
    function detectEscapeButton(e){
      if(e.keyCode == 27){
        close();
      }
    }
    document.addEventListener("keydown", detectEscapeButton);
    return  () => document.removeEventListener("keydown", detectEscapeButton);
  },[])
  return <ModalWrapper show={show} onClick={close}/>
}

export default Modal