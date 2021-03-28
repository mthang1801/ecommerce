import React, { useState, useContext } from "react";
import {
  Wrapper,
  NativeLink,
  Navigations,
} from "./styles/AdminNavigations.styles";
import { AdminLayoutContext } from "../../containers/AdminLayout";
const AdminPortfolioNavigations = ({
  navigation,
  setNavigation,
  dataNavigations,
}) => {
  const { openSidebar } = useContext(AdminLayoutContext);  
  return (
    <Wrapper>
      <Navigations openSidebar={openSidebar}>
        {dataNavigations.map((data) => (
          <NativeLink
            key={data.name}
            active={navigation === data.name}
            onClick={() => setNavigation(data.path)}
          >
            <span>{data.icon}</span>
            <span>{data.name}</span>
          </NativeLink>
        ))}
      </Navigations>
    </Wrapper>
  );
};

export default AdminPortfolioNavigations;
