import React, { useState } from "react";
import {
  NavigationItemsContainer,
  ExtensionLink,
  ExtensionScope,
} from "./navigation-items.styles";
import { CustomLink } from "../../UI/custom-link/custom-link.component";
import { AiOutlineDashboard, AiOutlineMenu } from "react-icons/ai";
import {
  FaCoins,
  FaArrowDown,
  FaArrowUp,
  FaProjectDiagram,
  FaListOl,
} from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
const NavigationItems = () => {
  const [toggleWebExtension, setToggleWebExtension] = useState(true);
  return (
    <NavigationItemsContainer>
      <CustomLink exact to="/" icon={<AiOutlineDashboard />}>
        {" "}
        Bảng điều khiển
      </CustomLink>
      <CustomLink
        to="/management"
        onClick={() => setToggleWebExtension(!toggleWebExtension)}
      >
        <FaCoins
          style={{ verticalAlign: "middle" }}
        />{" "}
        Quản lý Website{" "}
        {toggleWebExtension ? (
          <FaArrowDown
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          <FaArrowUp
            style={{ verticalAlign: "middle" }}
          />
        )}
      </CustomLink>
      <ExtensionScope show={toggleWebExtension}>
        <CustomLink to="/management/category" icon={<AiOutlineMenu />}>
          Danh mục
        </CustomLink>
        <CustomLink to="/management/product-types" icon={<FaProjectDiagram />}>
          Loại Sản phẩm
        </CustomLink>
        <CustomLink to="/management/products" icon={<FaListOl />}>
          DS sản phẩm
        </CustomLink>
        <CustomLink
          to="/management/sellers"
          icon={<BsFillPersonLinesFill />}
        >
          Nhà bán hàng
        </CustomLink>
      </ExtensionScope>
      
    </NavigationItemsContainer>
  );
};

export default NavigationItems;
