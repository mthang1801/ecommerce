import React, {memo} from "react";
import { CustomLink } from "./dropdown-menu-content.styles";
const DropdownMenuContent = ({onMouseEnter,item, activeLink}) => {
  return (
    <CustomLink
      onMouseEnter={(e) => onMouseEnter(e, item._id)}
      to={item.linkUrl}
      style={{ fontWeight: "400", textTransform: "capitalize" }}
      active={item._id === activeLink}
    >
      {item.name}
    </CustomLink>
  );
};

export default memo(DropdownMenuContent);
