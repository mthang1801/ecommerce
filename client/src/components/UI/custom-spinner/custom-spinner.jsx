import React from 'react'
import "./custom-spinner.styles.css" ;
import {SpinnerOverlay, SpinnerContainer} from "./custom-spinner.styles";
const CustomSpinner = ({smallScreen}) => {
  return (
    <SpinnerOverlay smallScreen={smallScreen}><SpinnerContainer/></SpinnerOverlay>
  )
}

export default CustomSpinner
