import React, { useState } from "react";
import {
  NavigationItemsContainer,
  ExtensionLink,
  ExtensionScope,
  Logout
} from "./navigation-items.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import { AiOutlineMenu, AiFillHome , AiOutlineHome} from "react-icons/ai";
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
import {withRouter} from "react-router-dom"
const NavigationItems = ({logout, match}) => {
  console.log(match);
  const [toggleProductManagementExtension, setToggleProductManagementExtension] = useState(true);
  const [toggleUIExtension, setToggleUIExtension] = useState(true);
  const [toggleHomeUI, setToggleHomeUI] = useState(true);
  return (
    <NavigationItemsContainer>
      <CustomLink exact to={`${match.path}`}>
        <AiFillHome style={{ margin: "0 7px 0 7px" }} />
        {" "}
        Trang chủ
      </CustomLink>
      <CustomLink        
        onClick={() => setToggleProductManagementExtension(!toggleProductManagementExtension)}
      >
        <FaCoins style={{ margin: "0 7px 0 7px" ,verticalAlign: "middle" }} /> QL Sản phẩm{" "}
        {toggleProductManagementExtension ? (
          <FaArrowDown style={{margin: "0 7px 0 7px", verticalAlign: "middle" }} />
        ) : (
          <FaArrowUp style={{ margin: "0 7px 0 7px", verticalAlign: "middle" }} />
        )}
      </CustomLink>
      <ExtensionScope show={toggleProductManagementExtension}>
        <CustomLink to={`${match.path}/category`}>
        <AiOutlineMenu style={{ margin: "0 7px 0 7px" }}/>
          Danh mục
        </CustomLink>
        <CustomLink to={`${match.path}/product-types`}>
          <FaProjectDiagram style={{ margin: "0 7px 0 7px" }}/>
          Loại Sản phẩm
        </CustomLink>        
        <CustomLink to={`${match.path}/sellers`}>
          <BsFillPersonLinesFill style={{ margin: "0 7px 0 7px" }}/>
          Nhà bán hàng
        </CustomLink>
      </ExtensionScope> 
      <CustomLink
        onClick={() => setToggleUIExtension(!toggleUIExtension)}
      >
        <FaCoins style={{ margin: "0 7px 0 7px" ,verticalAlign: "middle"}} /> QL giao diện người dùng{" "}
          {toggleUIExtension ? (
            <FaArrowDown style={{margin: "0 7px 0 7px", verticalAlign: "middle" }} />
          ) : (
            <FaArrowUp style={{ margin: "0 7px 0 7px", verticalAlign: "middle" }} />
          )}
      </CustomLink>
      <ExtensionScope show={toggleUIExtension}>
          <CustomLink to={`${match.path}/home-ui`}>
            <AiOutlineHome style={{margin: "0 7px 0 7px", verticalAlign: "middle" }}/>
            Trang chủ</CustomLink>          
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
export default connect(null,mapDispatchToProps)(withRouter(NavigationItems));
