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
import useLanguage from "../Global/useLanguage";
const DropdownUser = ({ user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userRef = useRef(null);
  const { i18n, lang } = useLanguage();
  const { userOptions } = i18n.store.data[lang].translation.header;
  const { authenticate } = i18n.store.data[lang].translation;
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
        {user && user?.role === "admin" ? (
          <Link to="/admin">
            <span>{userOptions.admin.icon}</span>
            <span> {userOptions.admin.name}</span>
          </Link>
        ) : user?.role === "seller" ? (
          <Link to="/post-product">
            <span>{userOptions.postProduct.icon}</span>
            <span>{userOptions.postProduct.name}</span>
          </Link>
        ) : user && user.role === "customer" ? (
          <Link to="/register-seller">
            <span>{userOptions.becomeAsSeller.icon}</span>
            <span>{userOptions.becomeAsSeller.name}</span>
          </Link>
        ) : null}
      </RowInline>
      <RowInline>
        <Link to="/setting-account">
          <span>{userOptions.settingAccount.icon}</span>
          <span> {userOptions.settingAccount.name}</span>
        </Link>
      </RowInline>
      <RowInline>
        <LanguageDropdown />
      </RowInline>
      <RowInline>
        <Link to="/ordered-history">
          <span>{userOptions.orderedHistory.icon}</span>
          <span> {userOptions.orderedHistory.name}</span>
        </Link>
      </RowInline>
      <RowInline>
        <Logout onClick={() => logout()}>
          <span>{userOptions.logout.icon}</span>
          <span> {userOptions.logout.name}</span>
        </Logout>
      </RowInline>
    </UserOptionsList>
  );
  console.log(user);
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
        {authenticate.login}
      </CustomLink>
      <CustomLink
        to="/auth/signup"
        color="red"
        style={{ textTransform: "capitialize" }}
      >
        {authenticate.signup}
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
