import React from 'react'
import {Wrapper} from "./styles/Tooltips.styles"
const Tooltip = ({children, show}) => {
  return (
    <Wrapper show={show}>
      {children}
    </Wrapper>
  )
}

export default Tooltip
