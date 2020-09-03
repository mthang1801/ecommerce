import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
  Discount
} from "./product-profile-text.styles";
import { FaHeart } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
import Chip from "@material-ui/core/Chip";
import {timeCountDown} from "../../../utils/algorithms"
const ProductProfileText = ({ mobileView, tabletView, product }) => { 
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
  function unescapeHTML(html) {
    var escapeEl = document.createElement("ul");
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  }
  return (
    <ProductProfileTextContainer
      mobileView={mobileView}
      tabletView={tabletView}
    >
      <Title>{product.name}</Title>
      {product.stars || product.comments.length ? (
        <Reviews>
          {product.stars ? (
            <Rating
              name="simple-controlled"
              value={product.stars}
              onChange={(event, newValue) => {}}
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

      <Price isDiscount={product.discount.value > 0 }>2.300.000 VND</Price>
      {product.discount.value > 0 ? <Discount>Giảm giá {product.discount.value}%</Discount> : null}
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
        <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </BriefTextsInfo>
      <ProductActions>
        <ProductQuantity>
          <Button>-</Button>
          <Paragraph>3</Paragraph>
          <Button>+</Button>
        </ProductQuantity>
        <Button bgColor="#7fad39">Add to cart</Button>
        <Button>
          <FaHeart />
        </Button>
      </ProductActions>
      <hr />
      <ProductStatus mobileView={mobileView} tabletView={tabletView}>
        <StatusText>Tình trạng sản phẩm</StatusText>
        <Row>
          <Span>Trạng thái</Span>
          <Span>{product.status === "active" ? "Còn hàng" : "Hết hàng"}</Span>
        </Row>
        <Row>
          <Span>Vận chuyển</Span>
          <Span>
            trong vòng 1 ngày{" "}
            <Span color="#dd2222">(miễn phí vận chuyển hôm nay)</Span>
          </Span>
        </Row>
        <Row>
          <Span>Khối lượng</Span>
          <Span>2.3kg</Span>
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

export default ProductProfileText;
