import React from 'react'
import {SpinnerOverlay, SpinnerContainer} from "./spinner.styles.jsx";
const Spinner = ({loadChildComponent}) => {
  return (
    <SpinnerOverlay loadChildComponent={loadChildComponent}><SpinnerContainer/></SpinnerOverlay>
  )
}

export default Spinner
