import React, { useEffect, useState, useRef } from "react";
import {
  Wrapper,
  Text,
  UserOptionsList,
  RowInline,
  Avatar,
  Logout,
} from "./styles/UserDropdown.styles";
import { Link } from "react-router-dom";
import { CustomLink } from "../Custom/CustomLink";
import { AiFillSetting, AiOutlineHistory } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FcBusinessman } from "react-icons/fc";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { logoutStart } from "../../redux/user/user.actions";
import LanguageDropdown from "./LanguagesDropdown";
const DropdownUser = ({ user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userRef = useRef(null);

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

  const authUserListOptions = (
    <UserOptionsList show={showDropdown}>
      <RowInline>
        {user && user.role === "seller" ? (
          <Link to="/register-seller">
            <span>
              <FcBusinessman />
            </span>
            <span>Post Product</span>
          </Link>
        ) : user && user.role === "customer" ? (
          <Link to="/create-new-product">
            <span>
              <FcBusinessman />
            </span>
            <span>Become as Seller</span>
          </Link>
        ) : null}
      </RowInline>
      <RowInline>
        <Link to="/setting-account">
          <span>
            <AiFillSetting />
          </span>
          <span>Setting Account</span>
        </Link>
      </RowInline>
      <RowInline>
        <LanguageDropdown />
      </RowInline>
      <RowInline>
        <Link to="/ordered-history">
          <span>
            <AiOutlineHistory />
          </span>
          <span>Ordered History</span>
        </Link>
      </RowInline>
      <RowInline>
        <Logout onClick={() => logout()}>
          <span>
            <FiLogOut />
          </span>
          <span>Logout</span>
        </Logout>
      </RowInline>
    </UserOptionsList>
  );
  console.log(user)
  if (user)
    return (
      <Wrapper ref={userRef}>
        <Avatar src={`http://localhost:5000/images/${user.avatar}`} />
        <Text>{user.name}</Text>
        {authUserListOptions}
      </Wrapper>
    );
  return (
    <Wrapper ref={userRef}>
      <CustomLink to="/auth" style={{ textTransform: "capitialize" }}>      
        Đăng nhập
      </CustomLink>
      <CustomLink to="/auth/signup" color="red" style={{ textTransform: "capitialize" }}>      
        Đăng Ký
      </CustomLink>
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownUser);
