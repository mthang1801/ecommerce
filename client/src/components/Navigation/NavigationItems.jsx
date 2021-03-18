import React, { useState, useEffect, useRef, useContext } from "react";
import { Row, SmallView } from "./styles/NavigationItems.styles";
import { CustomLink } from "../Custom/CustomLink";
import NavigationNotification from "./NavigationNotification";
import Icon from "../Custom/CustomIcon";
import { TiUser } from "react-icons/ti";
import {
  AiOutlineHome,
  AiOutlineContacts,
  AiOutlineGift,
  AiOutlineAccountBook,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { setCloseDrawer } from "../../redux/drawer/drawer.actions";
import Brand from "../Header/Brand";
import Tooltips from "./Tooltips";

const navigationsMenu = [
  {
    path: "/",
    name: "Home",
    icon: <AiOutlineHome />,
  },
  {
    path: "/products/discount",
    name: "Products on Sale",
    icon: <AiOutlineGift />,
  },
  {
    path: "/products/hot",
    name: "Selling products",
    icon: <FiTrendingUp />,
  },
  {
    path: "/products/favorite",
    name: "Favorite Products",
    icon: <MdFavoriteBorder />,
  },
  {
    path: "/contact",
    name: "Contact",
    icon: <AiOutlineContacts />,
  },
];
const NavigationItems = ({ user, setCloseDrawer }) => {
  const [tooltips, setTooltips] = useState("");

  return (
    <React.Fragment>
      <SmallView>
        <Row>
          <Brand />
        </Row>
        <Row>
          <NavigationNotification />
        </Row>
        <Row>
          {!user ? (
            <CustomLink
              to="/auth"
              style={{
                textTransform: "capitialize",
                borderLeft: "1px solid #eee",
              }}
            >
              <Icon
                icon={<TiUser />}
                style={{ transform: "scale(1.5)", marginRight: "1rem" }}
              />
              Đăng nhập
            </CustomLink>
          ) : (
            <CustomLink>
              <img
                src={`http://localhost:5000/images/${user.avatar}`}
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  marginRight: "4px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
              />
              <span>{user.name}</span>
            </CustomLink>
          )}
        </Row>
      </SmallView>
      {navigationsMenu.map((navigationItem) => (
        <Row
          key={navigationItem.name}
          onMouseEnter={() => setTooltips(navigationItem.name)}
          onMouseLeave={() => setTooltips("")}
        >
          <CustomLink to={navigationItem.path} title={navigationItem.name}>
            {navigationItem.icon}
            <span>{navigationItem.name}</span>
          </CustomLink>
          <Tooltips show={tooltips === navigationItem.name}>
            {navigationItem.name}
          </Tooltips>
        </Row>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCloseDrawer: () => dispatch(setCloseDrawer()),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
