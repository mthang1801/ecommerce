import React, { useEffect, memo, useState } from "react";
import {
  ProductItemContainer,
  ProductImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  OriginalPrice,
  ProductDiscountPrice,
  DiscountBrand,
  Button,
  ProductBtns,
  Backdrop
} from "./product-item.styles";
import { timeCountDown } from "../../../utils/algorithms";
import { AiFillEye, AiOutlineShoppingCart } from "react-icons/ai";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import {connect} from "react-redux";
import {addItem} from "../../../redux/cart/cart.actions"
const ProductItem = ({ product, addItem }) => {
  const [discountDate, setDiscountDate] = useState(null);
  const [timerDiscount, setTimerDiscount] = useState(null);
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
  }, []);

  return (
    <ProductItemContainer key={product.userId} title={product.name}>     
      <Backdrop/> 
      <ProductImageContainer>
        <ProductImage
          src={`data:${product.images[0].mimetype};base64,${product.images[0].data}`}
        />
        {product.stars && 
          <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="read-only"
            value={product.stars}
            precision={0.5}
            readOnly
          />
        </Box>
        }
      
      </ProductImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        {+product.discount.value === 0 ? (
          <OriginalPrice>
            {product.price.toLocaleString("es-AR")} Đ
          </OriginalPrice>
        ) : (
          <React.Fragment>
            <OriginalPrice discount>
              {product.price.toLocaleString("es-AR")} Đ
            </OriginalPrice>
            <ProductDiscountPrice>
              {(
                (product.price * (100 - parseFloat(product.discount.value))) /
                100
              ).toLocaleString("es-AR")}{" "}
              Đ
            </ProductDiscountPrice>
          </React.Fragment>
        )}

        {discountDate ? (
          discountDate < 7 ? (
            <Chip
              size="small"
              label={`còn ${timerDiscount}`}
              color="secondary"
              title={timerDiscount}
            />
          ) : (
            <Chip size="small" label={`còn ${timerDiscount}`} color="primary" />
          )
        ) : null}
      </ProductInfo>
      {product.discount.value > 0 && (
        <React.Fragment>
          <DiscountBrand>{-product.discount.value}%</DiscountBrand>
        </React.Fragment>
      )}
      <ProductBtns>
        <Button to={product.linkUrl}>
          <AiFillEye />
        </Button>
        <Button >
          <AiOutlineShoppingCart />
        </Button>
      </ProductBtns>
    </ProductItemContainer>
  );
};
const mapDispatchToProps = dispatch => ({
  addItem : (product) => dispatch(addItem(product))
})
export default connect(null, mapDispatchToProps)(memo(ProductItem));
