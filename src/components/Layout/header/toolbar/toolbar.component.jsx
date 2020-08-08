import React from "react";
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
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectIsMobile} from "../../../../redux/checkViewPort/checkViewPort.selectors";
const Toolbar = ({isMobile}) => {
    
  if(!isMobile)
    return (
      <ToolbarContainer>
        <ToolbarLeft>
          <ToolbarItem>hello@colorlib.com</ToolbarItem>
          {!isMobile &&  <ToolbarItem medium>Free Shipping for all Order of $99</ToolbarItem>}
         
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
            <ToggleLanguage/>
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

const mapStateToProps = createStructuredSelector({
  isMobile : selectIsMobile
})
export default connect(mapStateToProps)(Toolbar);
