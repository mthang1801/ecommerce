import React from "react";
import {NavigationNotificationWrapper, Option, CartPrice, CartNumber} from "./styles/NavigationNotification.styles";
import Icon from "../Custom/CustomIcon";
import {FaHeart, FaShoppingBag} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai";
import {createStructuredSelector} from "reselect";
import {selectCountItem} from "../../redux/cart/cart.selectors";
import {connect} from "react-redux"
import {toggleCart } from "../../redux/cart/cart.actions"
const NavigationNotification = ({countItem, toggleCart}) => {
 
  return (
    <NavigationNotificationWrapper>
      <Option>
        <Icon color="red" icon={<FaHeart />} number={1} />
      </Option>
      <Option>
        <Icon color="#ef6c00" icon={<FaShoppingBag />} number={5} />
      </Option>
      <Option style={{flexGrow : 1, textAlign : "right"}}>
        <CartPrice onClick={()=> toggleCart()}>
          <AiOutlineShoppingCart style={{fontSize:"1.5em",verticalAlign:"middle", margin : "0 10px"}}/> Giỏ hàng : <CartNumber>{countItem}</CartNumber>         
        </CartPrice>
      </Option>
    </NavigationNotificationWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  countItem : selectCountItem
})
const mapDispatchToProps = dispatch => ({
  toggleCart : () => dispatch(toggleCart())
})
export default connect(mapStateToProps,mapDispatchToProps)(NavigationNotification);
