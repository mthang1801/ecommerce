import React, {useState, useRef, useEffect} from 'react'
import {HeaderContainer,LeftSide, MidSide, RightSide, LogoImage,Option, CartPrice } from "./navigations.styles";
import Logo from "../../../assets/img/logo.png"
import Icon from "../../UI/custom-icon/custom-icon.component";
import {FaHeart, FaShoppingBag} from "react-icons/fa"
import {CustomLink} from "../../UI/custom-link/custom-link.component";
import PagesMenu from "../pages-menu/pages-menu.components";
const Header = () => {
  const [showPageMenu, setShowPageMenu] = useState(false);
  const pageMenuRef = useRef(null);
  
  useEffect(() => {
    function trackPageMenu(e){      
      if(pageMenuRef && !pageMenuRef.current.contains(e.target)){
        setShowPageMenu(false)
      }else{
        setShowPageMenu(true);
      }
    }
    document.addEventListener("mouseover", trackPageMenu);
    return () => document.removeEventListener("mouseover", trackPageMenu)
  })
  return (
    <HeaderContainer>
      <LeftSide>
        <CustomLink to="/">
          <LogoImage src={Logo}/>
        </CustomLink>
      </LeftSide>
      <MidSide>
        <Option>
            <CustomLink to="/">Home</CustomLink>
          </Option>
          <Option>
            <CustomLink to="/shop-grid">Shop</CustomLink>
          </Option>
          <Option ref={pageMenuRef}>
            <CustomLink>Pages</CustomLink>
            <PagesMenu show={showPageMenu}/>
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
