import React, { useState } from "react";
import {
  NavigationItemsContainer,
  ExtensionLink,
  ExtensionScope,
  Logout
} from "./navigation-items.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import { AiOutlineDashboard, AiOutlineMenu } from "react-icons/ai";
import {
  FaCoins,
  FaArrowDown,
  FaArrowUp,
  FaProjectDiagram,
  FaListOl,
} from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import {logout} from "../../../redux/user/user.actions";
import {connect} from "react-redux";
const NavigationItems = ({logout}) => {
  const [toggleWebExtension, setToggleWebExtension] = useState(true);
  return (
    <NavigationItemsContainer>
      <CustomLink exact to="/">
        <AiOutlineDashboard style={{ margin: "0 7px 0 7px" }} />
        {" "}
        Bảng điều khiển
      </CustomLink>
      <CustomLink
        to="/management"
        onClick={() => setToggleWebExtension(!toggleWebExtension)}
      >
        <FaCoins style={{ margin: "0 7px 0 7px" ,verticalAlign: "middle" }} /> Quản lý Website{" "}
        {toggleWebExtension ? (
          <FaArrowDown style={{margin: "0 7px 0 7px", verticalAlign: "middle" }} />
        ) : (
          <FaArrowUp style={{ margin: "0 7px 0 7px", verticalAlign: "middle" }} />
        )}
      </CustomLink>
      <ExtensionScope show={toggleWebExtension}>
        <CustomLink to="/management/category">
        <AiOutlineMenu style={{ margin: "0 7px 0 7px" }}/>
          Danh mục
        </CustomLink>
        <CustomLink to="/management/product-types">
          <FaProjectDiagram style={{ margin: "0 7px 0 7px" }}/>
          Loại Sản phẩm
        </CustomLink>        
        <CustomLink to="/management/sellers">
          <BsFillPersonLinesFill style={{ margin: "0 7px 0 7px" }}/>
          Nhà bán hàng
        </CustomLink>
      </ExtensionScope>
      <Logout onClick={logout}>
        <FiLogOut style={{ margin: "0 7px 0 7px" }} /> Logout
      </Logout>
    </NavigationItemsContainer>
  );
};
const mapDispatchToProps = dispatch => ({
  logout : () => dispatch(logout())
})
export default connect(null,mapDispatchToProps)(NavigationItems);
