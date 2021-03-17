import React from "react";
import {
  ToolbarContainer,
  ToolbarLeft,
  ToolbarItem,
  ToolbarRight,   
} from "./styles/Toolbar.styles";
import UserDropdown from "./UserDropdown"

const Toolbar = () => { 
    return (
      <ToolbarContainer>
        <ToolbarLeft>                    
            <ToolbarItem>Miễn phí vận chuyển cho đơn hàng từ 500.000</ToolbarItem>          
        </ToolbarLeft>
        <ToolbarRight>                
          <ToolbarItem>            
             <UserDropdown/>
          </ToolbarItem>           
        </ToolbarRight>
      </ToolbarContainer>
    );
  
};

export default Toolbar;
