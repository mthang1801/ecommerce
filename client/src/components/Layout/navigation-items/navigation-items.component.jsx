import React, { useState, useEffect, useRef, useContext } from "react";
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
import AppContext from "../../../context/app-viewport.context";

const NavigationItems = () => {  
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const [showPageMenu, setShowPageMenu] = useState(false);
  const pageMenuRef = useRef(null);
  const width = useContext(AppContext);
  
  useEffect(() => {
    if(width < 992){
      setSmallView(true);
    }else{
      setSmallView(false);
    }
  }, [width])

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
      {smallView && (
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
                to="/auth"
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
      <Option smallView>
      <CustomLink to="/"> {smallView && <AiOutlineHome/>} Home</CustomLink>
      </Option>
      <Option smallView>
        <CustomLink to="/shop-grid">{smallView && <AiOutlineShopping/>} Shop</CustomLink>
      </Option>
      <Option ref={pageMenuRef} smallView>
        <CustomLink to="/pages">{smallView && <FaConnectdevelop/> }Pages</CustomLink>
        <PagesMenu show={showPageMenu} />
      </Option>
      <Option smallView>
        <CustomLink to="/contact">{smallView && <AiOutlineContacts/>} Contact</CustomLink>
      </Option>
    </React.Fragment>
  );
};


export default NavigationItems;
