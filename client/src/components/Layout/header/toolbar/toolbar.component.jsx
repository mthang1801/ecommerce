import React, { useContext, useEffect, useState } from "react";
import {
  ToolbarContainer,
  ToolbarLeft,
  ToolbarItem,
  ToolbarRight,
  Icons,
} from "./toolbar.styles";
import {
  TiSocialFacebook,
  TiSocialGooglePlus,
  TiSocialTwitter,
  TiSocialInstagram,
  TiUser,
} from "react-icons/ti";
import ToggleLanguage from "../../toggle-languages/toggle-languages.component";
import Icon from "../../../UI/custom-icon/custom-icon.component";
import { CustomLink } from "../../../UI/custom-link/custom-link.component";
import AppContext from "../../../../context/app-viewport.context";
const Toolbar = () => {
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]); 
  if (!smallView)
    return (
      <ToolbarContainer>
        <ToolbarLeft>
          <ToolbarItem>hello@colorlib.com</ToolbarItem>
          {!smallView && (
            <ToolbarItem mediumView={width<1200}>Free Shipping for all Order of $99</ToolbarItem>
          )}
        </ToolbarLeft>
        <ToolbarRight>
          <ToolbarItem>
            <Icons>
              <Icon icon={<TiSocialFacebook />} color="#3b5998" />
              <Icon icon={<TiSocialGooglePlus />} color=" #db4a39" />
              <Icon icon={<TiSocialTwitter />} color="#FD1D1D" />
              <Icon icon={<TiSocialInstagram />} color="#FCAF45" />
            </Icons>
          </ToolbarItem>
          <ToolbarItem>
            <ToggleLanguage />
          </ToolbarItem>
          <ToolbarItem>
            <CustomLink to="/seller" style={{textTransform:"capitalize", fontWeight : 400}}>Become as seller</CustomLink>
          </ToolbarItem>
          <ToolbarItem>
            <CustomLink
              to="/auth/signin"
              style={{ textTransform: "capitialize" }}
            >
              <Icon
                icon={<TiUser />}
                style={{ transform: "scale(1.5)", marginRight: "1rem" }}
              />
              Login
            </CustomLink>
          </ToolbarItem>
        </ToolbarRight>
      </ToolbarContainer>
    );
  return null;
};

export default Toolbar;
