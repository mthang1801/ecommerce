import React from 'react'
import {LogoImage} from "./navigation-brand.styles";
import {CustomLink} from "../../UI/custom-link/custom-link.component";
import Logo from "../../../assets/img/logo.png"

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
