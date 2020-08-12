import React, { memo} from "react";
import classes from "./Modal.module.css";
import clsx from "clsx";
import Backdrop from "../backdrop/backdrop.component";
const Modal= props=> {     
    return(
      <React.Fragment>
        <Backdrop show={props.show} close={props.close}></Backdrop>
        <div className={clsx(classes.Modal, props.show ? classes.show : "")}>    
          {props.children}
        </div>      
      </React.Fragment>
    )  
}

export default memo(Modal, (prevProps, nextProps) =>  nextProps.show === prevProps.show || nextProps.children === prevProps.children);