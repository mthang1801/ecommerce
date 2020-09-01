import React from "react";
import { LeftSideMenuWrapper, Title } from "./left-side-menu.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
const LeftSideMenu = ({title, list}) => { 
  return (
    <LeftSideMenuWrapper>
      <Title>{title}</Title>
      {list &&
        list.map((listItem) => (
          <CustomLink
            key={listItem._id}
            to={listItem.linkUrl}
            style={{
              fontWeight: "normal",
              textTransform: "capitalize",             
            }}
          >
            {listItem.name} <span style={{color : "#757575", fontSize:"0.8em"}}>({listItem.products.length})</span>
          </CustomLink>
        ))}
    </LeftSideMenuWrapper>
  );
};

export default LeftSideMenu;
