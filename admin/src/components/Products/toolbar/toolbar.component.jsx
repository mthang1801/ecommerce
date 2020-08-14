import React from 'react'
import {ToolbarContainer, CustomNavLink} from "./toolbar.styles";
import {withRouter} from "react-router-dom";
import {FaHome} from "react-icons/fa"
import {AiFillFileAdd} from "react-icons/ai"
const Toolbar = ({match}) => { 
  return (
    <ToolbarContainer>
      <CustomNavLink exact to={`${match.path}`}><FaHome/>Trang chủ</CustomNavLink>
      <CustomNavLink to={`${match.path}/add-product`}><AiFillFileAdd/> Thêm sản phẩm</CustomNavLink>      
    </ToolbarContainer>
  )
}

export default withRouter(Toolbar)
