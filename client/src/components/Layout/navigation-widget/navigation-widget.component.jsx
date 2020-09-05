import React from "react";
import {NavigationWidgetWrapper, Option, CartPrice, CartNumber} from "./navigation-widget.styles";
import Icon from "../../UI/custom-icon/custom-icon.component";
import {FaHeart, FaShoppingBag} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai";
import {createStructuredSelector} from "reselect";
import {selectCountItem} from "../../../redux/cart/cart.selectors";
import {connect} from "react-redux"
import {toggleCart } from "../../../redux/cart/cart.actions"
const NavigationWidget = ({countItem, toggleCart}) => {
 
  return (
    <NavigationWidgetWrapper>
      <Option>
        <Icon icon={<FaHeart />} number={1} />
      </Option>
      <Option>
        <Icon icon={<FaShoppingBag />} number={5} />
      </Option>
      <Option style={{flexGrow : 1, textAlign : "right"}}>
        <CartPrice onClick={()=> toggleCart()}>
          <AiOutlineShoppingCart style={{fontSize:"1.5em",verticalAlign:"middle", margin : "0 10px"}}/> Giỏ hàng : <CartNumber>{countItem}</CartNumber>         
        </CartPrice>
      </Option>
    </NavigationWidgetWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  countItem : selectCountItem
})
const mapDispatchToProps = dispatch => ({
  toggleCart : () => dispatch(toggleCart())
})
export default connect(mapStateToProps,mapDispatchToProps)(NavigationWidget);
