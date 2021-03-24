import React, { useState, createContext } from "react";
import DashBoard from "../components/Admin/DashBoard";
import {
  Wrapper,
  Sidebar,
  MainContent,
  ButtonClose,
  ToggleDrawer,
} from "./styles/AdminLayout.styles";
import { FaChevronLeft } from "react-icons/fa";
import ButtonToggleDrawer from "../components/Controls/ButtonToggleDrawer";
export const AdminLayoutContext = createContext({});
const AdminLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  return (
    <AdminLayoutContext.Provider value={{ openSidebar }}>
      <Wrapper>
        <ToggleDrawer open={!openSidebar}>
          <ButtonToggleDrawer onClick={() => setOpenSidebar(true)} />
        </ToggleDrawer>
        <Sidebar open={openSidebar}>
          <ButtonClose onClick={() => setOpenSidebar(false)}>
            <FaChevronLeft />
          </ButtonClose>
          <DashBoard />
        </Sidebar>
        <MainContent scale={openSidebar}>{children}</MainContent>
      </Wrapper>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;
