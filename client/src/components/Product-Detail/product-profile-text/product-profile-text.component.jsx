import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {AiOutlineShoppingCart} from "react-icons/ai"
import {
  ProductProfileTextContainer,
  Title,
  Reviews,
  Span,
  Price,
  BriefTextsInfo,
  TextItem,
  ProductActions,
  ProductQuantity,
  Button,
  Paragraph,
  ProductStatus,
  StatusText,
  Row,
  Icons,
  Icon,
  Discount,
  PriceAfterDiscount,
} from "./product-profile-text.styles";
import { FaHeart } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import {timeCountDown} from "../../../utils/algorithms";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartPosition} from "../../../redux/cart/cart.selectors";
import {addItem, decreaseItem} from "../../../redux/cart/cart.actions";
import {connect} from "react-redux";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import {addProductToCart} from "../../../utils/algorithms"
const ProductProfileText = ({ mobileView, tabletView, product , cartItems, addItem, cartPosition}) => {   

  const [productToCart, setProductToCart] = useState(null)
  const [cartProduct, setCartProduct] = useState(undefined);
  const [cartQuantity, setCartQuantity] = useState(1);  
  useEffect(() => { 
    const cartItem = cartItems.find(item => item._id === product._id);       
    setCartProduct(cartItem) ;    
    if(cartItem && cartItem.quantity){
      setCartQuantity(cartItem.quantity)
    }else{
      setCartQuantity(1);
    }    
    if(product){      
      setProductToCart(addProductToCart(product))}
  }, [cartItems, product])
  const [countDown, setCountdown] = useState(null);
  useEffect(() => {
    let timerInterval ; 
    timerInterval = setInterval(() => {
      if(product.discount.end_at){
        setCountdown(timeCountDown(product.discount.end_at).timeString)
      }
    },1000)
    return () => clearInterval(timerInterval);
  }, [])
  const handleAddToCart = () => {
    addItem(productToCart, cartQuantity)
    window.scrollTo({
      top: cartPosition,
      behavior : "smooth"
    });    
  }
  const handleDecreaseCartQuantity = e => {
    if(cartQuantity > 1){
      setCartQuantity(prevState => prevState - 1 );
    }
  }

  const handleIncreaseCartQuantity = e => {
    setCartQuantity(prevState => prevState + 1 );
  }
  return (
    <ProductProfileTextContainer
      mobileView={mobileView}
      tabletView={tabletView}
    >
      <Title>{product.name}</Title>
      {product.stars || product.comments.length ? (
        <Reviews>
          {product.stars && product.stars > 0 && product.stars <= 5? (
            <Rating
              name="simple-controlled"
              value={product.stars}            
              precision={0.5}
              readOnly
              color="primary"
            />
          ) : null}
          {product.comments.length ? (
            <Span color="#dd2222">({product.comments.length} bình luận)</Span>
          ) : null}
        </Reviews>
      ) : null}
      {product.ship_fee === 0 ? <Chip icon={<LocalShippingOutlinedIcon style={{color :"white"}}/>}  label="Miễn phí vận chuyển" style={{margin :"1rem 0",backgroundColor:"#dd2222", color:"white"}}/> : null}
          <Price isDiscount={product.discount.value > 0 }>{product.price.toLocaleString("es-AR")} VND</Price>
      {product.discount.value > 0 ? 
        <React.Fragment>
          <Discount>Giảm giá {product.discount.value}%</Discount>  
          <PriceAfterDiscount>{(product.price * (100-product.discount.value) / 100).toLocaleString("es-AR")} VND</PriceAfterDiscount>
        </React.Fragment>
        : null}
      
      {countDown && 
      <React.Fragment>
        <span style={{color : "#3f51b5", fontSize:"0.90em", fontWeight:"bold"}}>Thời gian khuyến mãi còn </span>
        <Chip                
        size="small"       
        label={countDown}              
        readOnly
        color="primary"
        style={{verticalAlign:"middle"}}
      />
      </React.Fragment>}
      <BriefTextsInfo>
        <div dangerouslySetInnerHTML={{ __html: product.information }}></div>
      </BriefTextsInfo>
      <ProductActions>
        <ProductQuantity>
          <Button onClick={handleDecreaseCartQuantity}>-</Button>
          <Paragraph>{cartQuantity} </Paragraph>
          <Button onClick={handleIncreaseCartQuantity}>+</Button>
        </ProductQuantity>
        <Button bgColor="#7fad39" onClick={handleAddToCart}>Chọn mua <AiOutlineShoppingCart style={{fontSize: "1.2em"}}/></Button>
        <IconButton>
          <FavoriteBorderOutlined style={{color: "#e84118"}}/>
        </IconButton>
      </ProductActions>
      <hr />
      <ProductStatus mobileView={mobileView} tabletView={tabletView}>
        <StatusText>Tình trạng sản phẩm</StatusText>
        <Row>
          <Span>Trạng thái</Span>
          <Span>{product.quantity > product.sold_quantity ? "Còn hàng" : "Hết hàng"}</Span>
        </Row>
        <Row>
          <Span>Vận chuyển</Span>
          <Span>
            <Span>{product.ship_fee === 0 ?   <Span color="#dd2222">(miễn phí vận chuyển hôm nay)</Span> : <Span color="#dd2222">{product.ship_fee} Đ</Span>}</Span>
          
          </Span>
        </Row>
        <Row>
          <Span>Khối lượng</Span>
          <Span>{product.weight > 1000 ? `${(product.weight / 1000)}kg` : `${product.weight}g` }</Span>
        </Row>
        <Row>
          <Span>Chia sẻ</Span>
          <Icons>
            <Icon>
              <TiSocialFacebook />
            </Icon>
            <Icon>
              {" "}
              <TiSocialInstagram />
            </Icon>
            <Icon>
              {" "}
              <TiSocialTwitter />
            </Icon>
          </Icons>
        </Row>
      </ProductStatus>
    </ProductProfileTextContainer>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems : selectCartItems,
  cartPosition : selectCartPosition
})

const mapDispatchToProps = dispatch => ({
  addItem : (item, quantity) => dispatch(addItem(item, quantity)), 
  decreaseItem : (item) => dispatch(decreaseItem(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductProfileText);
