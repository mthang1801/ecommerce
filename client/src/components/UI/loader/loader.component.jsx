import React from 'react'
import Spinner from "../../UI/custom-spinner/custom-spinner";
import {LoaderWrapper} from "./loader.styles"
const Loader = () => {
  return (
    <LoaderWrapper>      
      <Spinner/>
    </LoaderWrapper>
  )
}

export default Loader
