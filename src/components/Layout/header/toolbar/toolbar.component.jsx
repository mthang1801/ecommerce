import React from "react" ;
import {ToolbarContainer, ToolbarLeft, ToolbarItem, ToolbarRight, Icons} from "./toolbar.styles";
import {TiSocialFacebook, TiSocialGooglePlus, TiSocialTwitter, TiSocialInstagram, TiUser} from "react-icons/ti"
import ReactCountryFlag from "react-country-flag";
import Language from "../../toggle-language/toggle-language.component";
import Icon from "../../../UI/custom-icon/custom-icon.component";
const  Toolbar = props => {
  return (
    <ToolbarContainer>
      <ToolbarLeft>
        <ToolbarItem>
          hello@colorlib.com
        </ToolbarItem>
        <ToolbarItem>
          Free Shipping for all Order of $99
        </ToolbarItem>
      </ToolbarLeft>
      <ToolbarRight>
        <ToolbarItem>
          <Icons>
            <Icon icon={<TiSocialFacebook/>} color="#3b5998"/>            
            <Icon icon={<TiSocialGooglePlus/>} color=" #db4a39"/>            
            <Icon icon={<TiSocialTwitter/>} color="#FD1D1D"/>   
            <Icon icon={<TiSocialInstagram/>} color="#FCAF45"/>   
          </Icons>
        </ToolbarItem>
        <ToolbarItem>
          <ReactCountryFlag
            countryCode="VN"
            svg
            style={{transform : "scale(1.5)", marginRight : "1rem"}}
          />
          <Language lang="vi"/>
        </ToolbarItem>
        <ToolbarItem>
          <Icon icon={<TiUser/>} style={{transform: "scale(1.5)", marginRight :"1rem"}}/>
          Login
        </ToolbarItem>
      </ToolbarRight>
    </ToolbarContainer>
  )
}

export default Toolbar ;