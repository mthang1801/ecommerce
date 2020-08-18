import React, { useContext, useEffect, useState } from "react";
import {
  ToolbarContainer,
  ToolbarLeft,
  ToolbarItem,
  ToolbarRight,
  Logout
} from "./toolbar.styles";
import {
  TiUser,
} from "react-icons/ti";
import {FiLogOut} from "react-icons/fi"
import ToggleLanguage from "../../toggle-languages/toggle-languages.component";
import Icon from "../../../UI/custom-icon/custom-icon.component";
import { CustomLink } from "../../../UI/custom-link/custom-link.component";
import AppContext from "../../../../context/app-viewport.context";
import {selectCurrentUser} from "../../../../redux/user/user.selectors"
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {logoutStart} from "../../../../redux/user/user.actions";
const Toolbar = ({user,logout}) => {   
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]); 
  if (!smallView)
    return (
      <ToolbarContainer>
        <ToolbarLeft>
          {user && <ToolbarItem>{user.name}</ToolbarItem>}
          {!smallView && (
            <ToolbarItem mediumView={width<1200}>Miễn phí vận chuyển cho đơn hàng từ 200.000</ToolbarItem>
          )}
        </ToolbarLeft>
        <ToolbarRight>        
          <ToolbarItem>
            <ToggleLanguage />
          </ToolbarItem>
          <ToolbarItem>
            <CustomLink to="/seller" style={{textTransform:"capitalize", fontWeight : 400}}>Trở thành Nhà Bán Hàng</CustomLink>
          </ToolbarItem>
          <ToolbarItem>
            {user ? <Logout onClick={() => logout()}>
                <Icon icon={<FiLogOut/>}
                style={{ transform: "scale(1.5)", marginRight: "1rem" }}/>
                Đăng xuất
              </Logout>: (
               <CustomLink
               to="/auth"
               style={{ textTransform: "capitialize" }}
             >
               <Icon
                 icon={<TiUser />}
                 style={{ transform: "scale(1.5)", marginRight: "1rem" }}
               />
               Login
             </CustomLink> 
            )}
           
          </ToolbarItem>
        </ToolbarRight>
      </ToolbarContainer>
    );
  return null;
};
const mapStateToProps = createStructuredSelector({
  user : selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
  logout : () => dispatch(logoutStart())
})
export default connect(mapStateToProps,mapDispatchToProps)(Toolbar);
