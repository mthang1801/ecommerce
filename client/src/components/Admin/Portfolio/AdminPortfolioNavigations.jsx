import React, { useState, useContext } from "react";
import {
  Wrapper,
  NativeLink,
  Navigations,
} from "./styles/AdminPortfolionavigations.styles";
import useLanguage from "../../Global/useLanguage";
import { AdminLayoutContext } from "../../../containers/AdminLayout";
const AdminPortfolioNavigations = ({ navigation, setNavigation }) => {
  const { i18n, lang } = useLanguage();
  const { portfolioNavigations } = i18n.store.data[
    lang
  ].translation.adminNavigations;
  const { openSidebar } = useContext(AdminLayoutContext);

  return (
    <Wrapper>
      <Navigations openSidebar={openSidebar}>
        {portfolioNavigations.map((portfolioItem) => (
          <NativeLink
            key={portfolioItem.name}
            active={navigation === portfolioItem.name}
            onClick={() => setNavigation(portfolioItem.path)}
          >
            <span>{portfolioItem.icon}</span>
            <span>{portfolioItem.name}</span>
          </NativeLink>
        ))}
      </Navigations>
    </Wrapper>
  );
};

export default AdminPortfolioNavigations;
