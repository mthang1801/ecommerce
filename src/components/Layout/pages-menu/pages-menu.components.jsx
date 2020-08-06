import React from 'react'
import {PageMenuContainer, CustomLink} from "./pages-menu.styles"
const PageMenu =  ({show}) => {
  console.log(show)
  return (
    <PageMenuContainer show={show}>
      <CustomLink to="/cart">Giỏ hàng</CustomLink>
      <CustomLink>Lịch sử mua hàng</CustomLink>
      <CustomLink>Blogs</CustomLink>
    </PageMenuContainer>
  )
}

export default PageMenu
