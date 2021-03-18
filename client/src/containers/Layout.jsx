import React from "react";
import { Wrapper, MainContent } from "./styles/Layout.styles";

import Header from "../components/Header/Header";
import Navigations from "../components/Navigation/Navigations";
import SideDrawer from "../components/Header/SideDrawer"
import Footer from "../components/Layout/footer/footer.component";
const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <SideDrawer/>     
      <Navigations />
      <MainContent>{children}</MainContent>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
