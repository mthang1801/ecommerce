import React, { useState, useEffect, memo } from "react";
import {
  ProductItemContainer,
  ProductItemImageContainer,
  ProductItemImage,
  ProductDiscount,
  ProductItemText,
  ProductName,
  ProductPrice,
  ProductNewPrice,
  ProductOldPrice,
  ButtonsGroup,  
  Backdrop,
  ProductUtil,
  Icon,
  ButtonFavorite,
  ButtonEye,
  ButtonCart
} from "./product-item.styles";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import { timeCountDown } from "../../../utils/algorithms";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addItem } from "../../../redux/cart/cart.actions";
import { addProductToCart } from "../../../utils/algorithms";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { addOrRemoveProductFavorite } from "../../..//redux/products-favorite/products-favorite.actions";
import { selectProductsFavoriteList } from "../../..//redux/products-favorite/products-favorite.selectors";
import { addOrRemoveFavoriteProductStart } from "../../..//redux/user/user.actions";
const ProductItem = ({
  product,
  history,  
  addItem,
  currentUser,
  productsFavorite,
  addOrRemoveProductFavorite,
  userAuthAddOrRemoveFavoriteProductStart
}) => {
  const [discountDate, setDiscountDate] = useState(null);
  const [timerDiscount, setTimerDiscount] = useState(null);
  const isFavorite = currentUser ? currentUser.favorite_products.length && currentUser.favorite_products.includes(product._id) : productsFavorite.includes(product._id)
  
  useEffect(() => {
    let timerInterval;
    if (product.discount.end_at) {
      timerInterval = setInterval(() => {
        let { dates, timeString } = timeCountDown(product.discount.end_at);
        setTimerDiscount(timeString);
        setDiscountDate(+dates);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [product]);
  const onAddToCart = (e) => {
    e.stopPropagation();
    addItem(addProductToCart(product));
  };
  const onAddOrRemoveFavorite = (e) => {
    e.stopPropagation();
    if(currentUser){
      userAuthAddOrRemoveFavoriteProductStart(product._id);
    }
    addOrRemoveProductFavorite(product._id);       
  };
  return (
    <ProductItemContainer
      title={product.name}
      onClick={(e) => history.push(product.linkUrl)}
    >
      <ProductItemImageContainer>
        <Backdrop />
        <ProductItemImage
          src={`data:${product.images[0].mimetype};base64,${product.images[0].data}`}
        />
        {product.discount.value > 0 && (
          <ProductDiscount>-{product.discount.value}%</ProductDiscount>
        )}
        <ButtonsGroup>
          <ButtonFavorite onClick={onAddOrRemoveFavorite} active={isFavorite}>
            <FaHeart />
          </ButtonFavorite>
          <ButtonEye>
            <FaEye />
          </ButtonEye>
          <ButtonCart onClick={onAddToCart}>
            <FaShoppingCart />
          </ButtonCart>
        </ButtonsGroup>
      </ProductItemImageContainer>
      <ProductItemText>
        <ProductUtil>
          {product.stars && (
            <Rating name="product-stars" value={product.stars} readOnly />
          )}
          {product.ship_fee === 0 && (
            <Icon src={require("../../../assets/free-ship.jpg")}></Icon>
          )}
        </ProductUtil>

        <ProductName>{product.name}</ProductName>
        <ProductPrice>
          {product.discount.value > 0 && (
            <ProductOldPrice>
              {product.price.toLocaleString("es-AR")}Đ
            </ProductOldPrice>
          )}
          <ProductNewPrice>
            {(
              (product.price * (100 - product.discount.value)) /
              100
            ).toLocaleString("es-AR")}
            Đ
          </ProductNewPrice>
        </ProductPrice>
        {discountDate ? (
          discountDate < 7 ? (
            <Chip
              size="small"
              label={`còn ${timerDiscount}`}
              color="secondary"
              title={timerDiscount}
              style={{
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            />
          ) : (
            <Chip size="small" label={`còn ${timerDiscount}`} color="primary" />
          )
        ) : null}
      </ProductItemText>
    </ProductItemContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  productsFavorite: selectProductsFavoriteList,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (product) => dispatch(addItem(product)),
  addOrRemoveProductFavorite: (productId) =>
    dispatch(addOrRemoveProductFavorite(productId)),
  userAuthAddOrRemoveFavoriteProductStart : productId => dispatch(addOrRemoveFavoriteProductStart(productId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(withRouter(ProductItem)));
