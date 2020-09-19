import React from 'react'
import Logo from "../../../assets/img/background.jpg";
import {BackgroundContainer, BackgroundItem} from "./background.styles";
const Background = ({label}) => {
  const labelArray = label.split("/");

  return (
    <BackgroundContainer >     
      {labelArray.length ? labelArray.map((labelItem, index) => (
        <BackgroundItem key={index} >{labelItem}</BackgroundItem>
      )) : null}
    </BackgroundContainer>
  )
}

export default Background
