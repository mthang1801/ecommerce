import React, { useEffect, useState, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
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
import { TiUser } from "react-icons/ti";
import { FcBusinessman } from "react-icons/fc";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import Icon from "../Custom/CustomIcon";
import { logoutStart } from "../../redux/user/user.actions";
import LanguageDropdown from "./LanguagesDropdown"
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
        {user.role === "seller" ? (
          <Link to="/register-seller">
            <span>
              <FcBusinessman />
            </span>
            <span>Post Product</span>
          </Link>
        ) : user.role === "customer" ? (
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
          <LanguageDropdown/>
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

  return (
    <Wrapper ref={userRef}>
      {user ? (
        <React.Fragment>
          <Avatar src={`http://localhost:5000/images/${user.avatar}`} />
          <Text>{user.name}</Text>
          {authUserListOptions}          
        </React.Fragment>
      ) : (
        <CustomLink to="/auth" style={{ textTransform: "capitialize" }}>
          <Icon
            icon={<TiUser />}
            style={{
              transform: "scale(1.5)",
              marginRight: "1rem",
              verticalAlign: "middle",
            }}
          />
          Đăng nhập
        </CustomLink>
      )}
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
