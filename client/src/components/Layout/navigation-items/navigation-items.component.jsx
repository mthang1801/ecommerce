import React, { useState, useEffect, useRef, useContext } from "react";
import { Option, RowInline } from "./navigation-items.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import PagesMenu from "../pages-menu/pages-menu.components";
import Brand from "../navigation-brand/navigation-brand.component";
import Widget from "../navigation-widget/navigation-widget.component";
import ToggleLanguages from "../toggle-languages/toggle-languages.component";
import Icon from "../../UI/custom-icon/custom-icon.component";
import {TiUser} from "react-icons/ti"
import {AiOutlineHome,AiOutlineShopping,AiOutlineContacts, AiOutlineGift, AiOutlineAccountBook } from "react-icons/ai";
import {MdFavoriteBorder} from "react-icons/md"
import {FaConnectdevelop } from "react-icons/fa";
import {FiTrendingUp } from "react-icons/fi";
import AppContext from "../../../context/app-viewport.context";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../../redux/user/user.selectors"
import {connect} from "react-redux";
import {setCloseDrawer} from "../../../redux/drawer/drawer.actions"
const NavigationItems = ({user, setCloseDrawer}) => {  
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

  // useEffect(() => {
  //   function trackPageMenu(e) {
  //     if (pageMenuRef && !pageMenuRef.current.contains(e.target)) {
  //       setShowPageMenu(false);
  //     } else {
  //       setShowPageMenu(true);
  //     }
  //   }
  //   document.addEventListener("mouseover", trackPageMenu);
  //   return () => document.removeEventListener("mouseover", trackPageMenu);
  // },[]);

  
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
              {!user ?  <CustomLink
                to="/auth"
                style={{ textTransform: "capitialize", borderLeft: "1px solid #eee"}}
              >
                <Icon
                  icon={<TiUser />}
                  style={{ transform: "scale(1.5)", marginRight: "1rem" }}
                />
                Đăng nhập
              </CustomLink> : 
              <CustomLink>
                <img src={`http://localhost:5000/images/${user.avatar}`} style={{width:"1.5rem", height :"1.5rem", marginRight: "4px" , borderRadius: "50%", border : "1px solid #ccc"}}/>  
                <span>{user.name}</span>
              </CustomLink>}
             
            </RowInline>
          </Option>
        </React.Fragment>
      )}
      <Option smallView>
        <CustomLink to="/" title="Trang chủ" onClick={setCloseDrawer}><AiOutlineHome/>{smallView ? "Trang chủ" : ""} </CustomLink>
      </Option>      
      <Option smallView>
        <CustomLink to="/products/discount" title="SP đang giảm giá" onClick={setCloseDrawer}><AiOutlineGift/>{smallView ? "SP đang giảm giá" : ""}</CustomLink>
      </Option>
      <Option smallView>
        <CustomLink to="/products/hot" title="SP bán chạy" onClick={setCloseDrawer}><FiTrendingUp/>{smallView ? "SP bán chạy" : ""}</CustomLink>
      </Option>
      <Option smallView>
        <CustomLink to="/products/favorite" title="SP Bạn yêu thích" onClick={setCloseDrawer}><MdFavoriteBorder/>{smallView ? "SP Bạn yêu thích" : ""}</CustomLink>
      </Option>
      <Option smallView>
        <CustomLink to="/ordered-history" title="Lịch sử giao dịch" onClick={setCloseDrawer}><AiOutlineAccountBook/>{smallView ? "Lịch sử giao dịch" : ""}</CustomLink>
      </Option>
      {/* <Option ref={pageMenuRef} smallView>
        <CustomLink to="/">{smallView && <FaConnectdevelop/> }Pages</CustomLink>
        <PagesMenu show={showPageMenu} />
      </Option> */}
      <Option smallView>
        <CustomLink to="/contact" title="Liên hệ" onClick={setCloseDrawer}><AiOutlineContacts/>{smallView ? "Liên hệ với chúng tôi" : ""}</CustomLink>
      </Option>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  user : selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
  setCloseDrawer : () => dispatch(setCloseDrawer())
})
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
