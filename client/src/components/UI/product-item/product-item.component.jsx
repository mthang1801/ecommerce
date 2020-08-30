import React, {useState, useEffect} from "react";
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
  Button, 
  Backdrop   
} from "./product-item.styles";
import {FaHeart, FaShoppingCart, FaEye} from "react-icons/fa";
import Rating from '@material-ui/lab/Rating';
import Chip from "@material-ui/core/Chip"
import {timeCountDown} from "../../../utils/algorithms"
import {withRouter} from "react-router-dom";
const ProductItem = ({ product, history }) => {  
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
  }, [product]);

  return (
    <ProductItemContainer title={product.name} onClick={() => history.push(`${product.linkUrl}`)}>      
      <ProductItemImageContainer>
        <Backdrop/>
        <ProductItemImage src={`data:${product.images[0].mimetype};base64,${product.images[0].data}`} />
        {product.discount.value > 0 && <ProductDiscount>-{product.discount.value}%</ProductDiscount>}
        <ButtonsGroup>
          <Button><FaHeart/></Button>
          <Button><FaEye/></Button>
          <Button><FaShoppingCart/></Button>
        </ButtonsGroup>
      </ProductItemImageContainer>
      <ProductItemText>
        {product.stars && <Rating
          name="product-stars"
          value={product.stars}
          readOnly
        />}
        <ProductName>{product.name}</ProductName>       
        <ProductPrice>
        {product.discount.value > 0 && <ProductOldPrice>{product.price.toLocaleString("es-AR")}Đ</ProductOldPrice>}
          <ProductNewPrice>{(product.price * (100-product.discount.value)/100).toLocaleString("es-AR")}Đ</ProductNewPrice>                 
        </ProductPrice>
        {discountDate ? (
          discountDate < 7 ? (
            <Chip
              size="small"
              label={`còn ${timerDiscount}`}
              color="secondary"
              title={timerDiscount}
              onMouseOver={e => e.stopPropagation()}
            />
          ) : (
            <Chip size="small" label={`còn ${timerDiscount}`} color="primary" />
          )
        ) : null}
      </ProductItemText>
    </ProductItemContainer>
  );
};

export default withRouter(ProductItem);
