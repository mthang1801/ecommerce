import React from 'react'
import Backdrop from "../../UI/backdrop/backdrop.component";
import Spinner from "../../UI/custom-spinner/custom-spinner";
const Loader = () => {
  return (
    <React.Fragment>
      <Backdrop/>
      <Spinner/>
    </React.Fragment>
  )
}

export default Loader
