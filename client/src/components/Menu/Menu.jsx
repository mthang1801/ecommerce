import React from 'react'
import {PageMenuContainer, CustomLink} from "./styles/Menu.styles"
const PageMenu =  ({show}) => { 
  return (
    <PageMenuContainer show={show}>
      <CustomLink to="/details">Chi tiết sản phẩm</CustomLink>
      <CustomLink to="/cart">Giỏ hàng</CustomLink>
      <CustomLink to="/checkout">Tiến hành thành toán</CustomLink>
      <CustomLink to="/ordered-history">Lịch sử mua hàng</CustomLink>      
    </PageMenuContainer>
  )
}

export default PageMenu
