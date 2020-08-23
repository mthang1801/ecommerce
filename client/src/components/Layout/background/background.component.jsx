import React from 'react'
import Logo from "../../../assets/img/background.jpg";
import {BackgroundContainer, BackgrounLabel, BackgroundImageContainer} from "./background.styles";
const Background = ({label}) => {
  return (
    <BackgroundContainer >     
      <BackgrounLabel>{label}</BackgrounLabel>
    </BackgroundContainer>
  )
}

export default Background
