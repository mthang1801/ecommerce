import React, {memo} from "react";
import { CustomLink } from "./styles/CategoryMenuItem.styles";
const CategoryMenuItem = ({category, active, onMouseOver}) => {
  const {_id, name, linkUrl} = category    
  return (
    <CustomLink      
      onMouseOver={() => onMouseOver(_id)}      
      to={linkUrl}
      style={{ fontWeight: "400", textTransform: "capitalize" }}
      active={active}
    >
      {name}
    </CustomLink>
  );
};

export default memo(CategoryMenuItem);

