import React from 'react'
import {HeaderContainer,LeftSide, MidSide, RightSide, LogoContainer, LogoImage,Option, CartPrice } from "./header.styles";
import Logo from "../../assets/img/logo.png"
import Icon from "../custom-icon/custom-icon.component";
import {FaHeart, FaShoppingBag} from "react-icons/fa"
import {CustomLink} from "../custom-link/custom-link.component";
const Header = () => {
  return (
    <HeaderContainer>
      <LeftSide>
        <LogoContainer>
          <LogoImage src={Logo}/>
        </LogoContainer>
      </LeftSide>
      <MidSide>
        <Option>
            <CustomLink to="/">Home</CustomLink>
          </Option>
          <Option>
            <CustomLink to="/shop">Shop</CustomLink>
          </Option>
          <Option>
            <CustomLink to="/pages">Pages</CustomLink>
          </Option>
          <Option>
            <CustomLink to="/blog">Blog</CustomLink>
          </Option>
          <Option>
            <CustomLink to="/contact">Contact</CustomLink>
          </Option>
      </MidSide>
      <RightSide>        
        <Option>
          <Icon icon={<FaHeart/>} number={1}/>   
        </Option>
        <Option>                           
          <Icon icon={<FaShoppingBag/>} number={5}/>
        </Option>
        <Option>
          <CartPrice>Cart: ${150.00}</CartPrice>
        </Option>
      </RightSide>
    </HeaderContainer>
  )
}

export default Header
