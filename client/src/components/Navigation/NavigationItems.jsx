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
  AiOutlineSetting
} from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FiTrendingUp } from "react-icons/fi";
import AppContext from "../../context/app-viewport.context";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect } from "react-redux";
import { setCloseDrawer } from "../../redux/drawer/drawer.actions";
import Brand from "./NavigationBrand";
const NavigationItems = ({ user, setCloseDrawer }) => {
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);

  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]);

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
      <Row >
        <CustomLink to="/" title="Trang chủ" onClick={setCloseDrawer}>
          <AiOutlineHome />
          <span>Home</span>
        </CustomLink>
      </Row>
      <Row >
        <CustomLink
          to="/products/discount"
          title="SP đang giảm giá"
          onClick={setCloseDrawer}
        >
          <AiOutlineGift />
          <span>Products on Sale</span>
        </CustomLink>
      </Row>
      <Row >
        <CustomLink
          to="/products/hot"
          title="SP bán chạy"
          onClick={setCloseDrawer}
        >
          <FiTrendingUp />
           <span>Selling Products</span>
        </CustomLink>
      </Row>
      <Row smallView>
        <CustomLink
          to="/products/favorite"
          title="SP Bạn yêu thích"
          onClick={setCloseDrawer}
        >
          <MdFavoriteBorder />
          <span>Favorite Products</span>
        </CustomLink>
      </Row>
      <Row smallView>
        <CustomLink
          to="/ordered-history"
          title="Lịch sử giao dịch"
          onClick={setCloseDrawer}
        >
          <AiOutlineAccountBook />
          <span>Ordered History</span>
        </CustomLink>
      </Row>
      {/* <Row ref={pageMenuRef} smallView>
        <CustomLink to="/">{smallView && <FaConnectdevelop/> }Pages</CustomLink>
        <PagesMenu show={showPageMenu} />
      </Row> */}
      <Row>
        <CustomLink to="/contact" title="Liên hệ" onClick={setCloseDrawer}>
          <AiOutlineContacts />
          <span>Contact</span>
        </CustomLink>
      </Row>
      <Row>
        <CustomLink to="/contact" title="Liên hệ" onClick={setCloseDrawer}>
          <AiOutlineSetting />
          <span>Setting</span>
        </CustomLink>
      </Row>
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
