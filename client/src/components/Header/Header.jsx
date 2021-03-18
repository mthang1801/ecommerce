import React from "react";
import {
  HeaderLargeViewPort,
  HeaderSmallViewPort,
  HeaderLeft,
  HeaderItem,
  HeaderRight,
} from "./styles/Header.styles";
import UserDropdown from "./UserDropdown";
import Brand from "./Brand";
import SearchHeader from "../Search/SearchHeader";
import ButtonToggleDrawer from "../Controls/ButtonToggleDrawer";
const Header = () => {
  return (
    <>
      <HeaderLargeViewPort>
        <HeaderLeft>
          <Brand />
          <SearchHeader />
        </HeaderLeft>
        <HeaderRight>
          <UserDropdown />
        </HeaderRight>
      </HeaderLargeViewPort>
      <HeaderSmallViewPort>
        <HeaderLeft>
          <Brand />
          <SearchHeader />
        </HeaderLeft>
        <HeaderRight>
          <ButtonToggleDrawer />
        </HeaderRight>
      </HeaderSmallViewPort>
    </>
  );
};

export default Header;
