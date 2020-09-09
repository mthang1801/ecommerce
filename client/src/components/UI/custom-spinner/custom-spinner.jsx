import React from 'react'
import "./custom-spinner.styles.css" ;
import {SpinnerOverlay, SpinnerContainer} from "./custom-spinner.styles";
const CustomSpinner = () => {
  return (
    <SpinnerOverlay><SpinnerContainer/></SpinnerOverlay>
  )
}

export default CustomSpinner
