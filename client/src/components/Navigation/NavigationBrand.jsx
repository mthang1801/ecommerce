import React from 'react'
import {LogoImage} from "./styles/NavigationBrand.styles";
import {CustomLink} from "../Custom/CustomLink";
import Logo from "../../assets/img/logo.png"

const NavigationBrand = () => {
  return (
    <React.Fragment>
      <CustomLink to="/">
        <LogoImage src={Logo}/>
      </CustomLink>
    </React.Fragment>
  )
}

export default NavigationBrand
