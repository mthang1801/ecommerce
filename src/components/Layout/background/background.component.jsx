import React from 'react'
import Logo from "../../../assets/img/background.jpg";
import {BackgroundContainer, BackgrounLabel, BackgroundImageContainer} from "./background.styles";
const Background = ({label}) => {
  return (
    <BackgroundContainer >
      <BackgroundImageContainer background={Logo} />
      <BackgrounLabel>{label}</BackgrounLabel>
    </BackgroundContainer>
  )
}

export default Background
