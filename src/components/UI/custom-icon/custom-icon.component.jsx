import React from 'react'
import {IconContainer, Number, NumberContainer} from "./custom-icon.styles";
const Icon = ({icon,color,number,...props}) => {  
  return (
    <IconContainer {...props} color={color} >
      {icon}
      {number ? <NumberContainer><Number>{number}</Number></NumberContainer> : null}
    </IconContainer>
  )
}

export default Icon
