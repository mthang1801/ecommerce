import React from "react";
import {Option, CartPrice} from "./navigation-widget.styles";
import Icon from "../../UI/custom-icon/custom-icon.component";
import {FaHeart, FaShoppingBag} from "react-icons/fa"

const NavigationWidget = () => {
  return (
    <React.Fragment>
      <Option>
        <Icon icon={<FaHeart />} number={1} />
      </Option>
      <Option>
        <Icon icon={<FaShoppingBag />} number={5} />
      </Option>
      <Option>
        <CartPrice>Cart: ${150.0}</CartPrice>
      </Option>
    </React.Fragment>
  );
};

export default NavigationWidget;
