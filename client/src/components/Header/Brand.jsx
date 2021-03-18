import React from 'react'
import {LogoImage} from "./styles/Brand.styles";
import {CustomLink} from "../Custom/CustomLink";
import Logo from "../../assets/img/logo.png"

const Brand = () => {
  return (
    <React.Fragment>
      <CustomLink to="/">
        <LogoImage src={Logo}/>
      </CustomLink>
    </React.Fragment>
  )
}

export default Brand
