import React, { useEffect, useState, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  ToggleUserContainer,
  Text,
  UserOptionsList,
  RowInline,
  Avatar,
  Logout
} from "./toggle-user.styles";
import { Link } from "react-router-dom";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import { AiFillSetting, AiOutlineHistory } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { TiUser } from "react-icons/ti";
import {FcBusinessman} from "react-icons/fc"
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { connect } from "react-redux";
import Icon from "../../UI/custom-icon/custom-icon.component";
import {logoutStart} from "../../../redux/user/user.actions";
const configOptions = [
  {
    name: "settings",
    text: "Tài khoản",
    icon: () => <AiFillSetting />,
    linkUrl: "/user/account",
  },
  {
    name: "orderedHistory",
    text: "Lịch sử giao dịch",
    icon: () => <AiOutlineHistory />,
    linkUrl: "/ordered-history",
  },
  {
    name: "logout",
    text: "Đăng xuất",
    icon: () => <FiLogOut />,
    linkUrl: "/logout",
  },   
];

const ToggleUser = ({ user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userRef = useRef(null); 
  const [listOptions, setListOptions] = useState([]);

 
  useEffect(() => {   
    if(user && user.role){
      configOptions.unshift({
        name : "seller",
        text : user.role === "seller" ? "Bán sản phẩm" : "Trở thành nhà bán hàng", 
        icon : () => <FcBusinessman/>,
        linkUrl : user.role === "seller" ? "/create-new-product" : "/register-seller"
      })
    }
    setListOptions(configOptions)
  },[user])
  useEffect(() => {
    function trackUserDropdown(e) {
      if (userRef && userRef.current.contains(e.target)) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mouseover", trackUserDropdown);
    return () => document.removeEventListener("mouseover", trackUserDropdown);
  }, []);
  return (
    <ToggleUserContainer ref={userRef}>
      {user ? (
        <React.Fragment>
          <Avatar src={`http://localhost:5000/images/${user.avatar}`} />
          <Text>{user.name}</Text>
          <UserOptionsList show={showDropdown}>
            {listOptions.length ? listOptions.map((option) => (
              <RowInline key={option.name}>
                {option.name ==="logout" ? <Logout onClick={() => logout()}>
                <Icon icon={<FiLogOut/>}
                color="white"
                style={{ transform: "scale(1.5)", marginRight: "1rem", verticalAlign:"middle"}}/>
                Đăng xuất
              </Logout> : <Link to={option.linkUrl} style={{ color: "white" }}>
                  <span style={{width : "1rem", height : "1rem" , marginRight :"5px"}}>{option.icon()}</span>
                  {option.text}
                </Link> }
              </RowInline>
            )) : null}
          </UserOptionsList>
        </React.Fragment>
      ) : (
        <CustomLink to="/auth" style={{ textTransform: "capitialize" }}>
          <Icon
            icon={<TiUser />}
            style={{ transform: "scale(1.5)", marginRight: "1rem", verticalAlign:"middle" }}
          />
          Đăng nhập
        </CustomLink>
      )}
    </ToggleUserContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  logout : () => dispatch(logoutStart())
})


export default connect(null, mapDispatchToProps)(ToggleUser)