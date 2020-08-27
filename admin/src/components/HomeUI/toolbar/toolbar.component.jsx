import React from 'react'
import {ToolbarContainer, CustomNavLink} from "./toolbar.styles";
import {withRouter} from "react-router-dom";
const Toolbar = ({match}) => { 
  return (
    <ToolbarContainer>
      <CustomNavLink exact to={`${match.path}`}>Index</CustomNavLink>
      <CustomNavLink to={`${match.path}/menu`}>Danh Mục Sản Phẩm</CustomNavLink>      
    </ToolbarContainer>
  )
}

export default withRouter(Toolbar)
