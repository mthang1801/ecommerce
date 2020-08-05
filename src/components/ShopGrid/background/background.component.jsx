import React from 'react'
import Logo from "../../../assets/img/shop-grid-logo.jpg";
import {BackgroundContainer, BackgrounLabel, BackgroundImageContainer} from "./background.styles";
const Background = () => {
  return (
    <BackgroundContainer >
      <BackgroundImageContainer background={Logo} />
      <BackgrounLabel>OGANI SHOP</BackgrounLabel>
    </BackgroundContainer>
  )
}

export default Background
