import React from 'react'
import Spinner from "../../UI/custom-spinner/custom-spinner";
import {LoaderWrapper} from "./loader.styles"
const Loader = ({smallScreen}) => {
  return (
    <LoaderWrapper>      
      <Spinner smallScreen={smallScreen}/>
    </LoaderWrapper>
  )
}

export default Loader
