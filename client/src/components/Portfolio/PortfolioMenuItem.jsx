import React, {memo} from "react";
import { CustomLink } from "./styles/PortfolioMenuItem.styles";
const PortfolioMenuItem = ({portfolio, active, onMouseOver}) => {
  const {_id, name, slug} = portfolio    
  return (
    <CustomLink        
      onMouseOver={onMouseOver}
      to={slug}
      style={{ fontWeight: "400", textTransform: "capitalize" }}
      active={active}
    >
      {name}
    </CustomLink>
  );
};

export default memo(PortfolioMenuItem);

