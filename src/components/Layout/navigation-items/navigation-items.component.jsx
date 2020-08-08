import React, { useState, useEffect, useRef } from "react";
import { Option, RowInline } from "./navigation-items.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import PagesMenu from "../pages-menu/pages-menu.components";
import Brand from "../navigation-brand/navigation-brand.component";
import Widget from "../navigation-widget/navigation-widget.component";
import ToggleLanguages from "../toggle-languages/toggle-languages.component";
import Icon from "../../UI/custom-icon/custom-icon.component";
import {TiUser} from "react-icons/ti"
import {AiOutlineHome,AiOutlineShopping,AiOutlineContacts } from "react-icons/ai";
import {FaConnectdevelop } from "react-icons/fa";
import {selectIsMobile} from "../../../redux/checkViewPort/checkViewPort.selectors"
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

const NavigationItems = ({isMobile}) => {
  const [showPageMenu, setShowPageMenu] = useState(false);
  const pageMenuRef = useRef(null);

  useEffect(() => {
    function trackPageMenu(e) {
      if (pageMenuRef && !pageMenuRef.current.contains(e.target)) {
        setShowPageMenu(false);
      } else {
        setShowPageMenu(true);
      }
    }
    document.addEventListener("mouseover", trackPageMenu);
    return () => document.removeEventListener("mouseover", trackPageMenu);
  },[]);


  return (
    <React.Fragment>
      {isMobile && (
        <React.Fragment>
          <Option m1>
            <Brand />
          </Option>
          <Option m1>
            <RowInline>
              <Widget />
            </RowInline>
          </Option>
          <Option>
            <RowInline>
              <ToggleLanguages />
              <CustomLink
                to="/auth/signin"
                style={{ textTransform: "capitialize", borderLeft: "1px solid #eee"}}
              >
                <Icon
                  icon={<TiUser />}
                  style={{ transform: "scale(1.5)", marginRight: "1rem" }}
                />
                Login
              </CustomLink>
            </RowInline>
          </Option>
        </React.Fragment>
      )}
      <Option isMobile>
      <CustomLink to="/"> {isMobile && <AiOutlineHome/>} Home</CustomLink>
      </Option>
      <Option isMobile>
        <CustomLink to="/shop-grid">{isMobile && <AiOutlineShopping/>} Shop</CustomLink>
      </Option>
      <Option ref={pageMenuRef} isMobile>
        <CustomLink to="/pages">{isMobile && <FaConnectdevelop/> }Pages</CustomLink>
        <PagesMenu show={showPageMenu} />
      </Option>
      <Option isMobile>
        <CustomLink to="/contact">{isMobile && <AiOutlineContacts/>} Contact</CustomLink>
      </Option>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isMobile : selectIsMobile
})

export default connect(mapStateToProps)(NavigationItems);
