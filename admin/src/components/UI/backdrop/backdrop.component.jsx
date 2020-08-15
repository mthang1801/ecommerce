import React, {useEffect} from "react";
import {BackdropWrapper} from "./backdrop.styles";
const Backdrop = ({close, show,loading=false}) => { 
  useEffect(() => {    
    function detectEscapeButton(e){
      if(e.keyCode == 27){
        close();
      }
    }
    document.addEventListener("keydown", detectEscapeButton);
    return  () => document.removeEventListener("keydown", detectEscapeButton);
  },[])
  console.log(loading)
  return <BackdropWrapper loading={loading ? loading : undefined} show={show} onClick={close}/>
}

export default Backdrop