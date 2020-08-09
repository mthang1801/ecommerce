import React, { useState } from "react";
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
  Icon
} from "./product-profile-text.styles";
import { FaHeart } from "react-icons/fa";
import {
  TiSocialFacebook,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
const ProductProfileText = ({mobileView, tabletView}) => {
  return (
    <ProductProfileTextContainer mobileView={mobileView} tabletView={tabletView}>
      <Title>Vetgetable’s Package</Title>
      <Reviews>
        <Rating
          name="simple-controlled"
          value={4.3}
          onChange={(event, newValue) => {}}
          precision={0.5}
          readOnly
        />
        <Span color="#dd2222">(18 reviews)</Span>
      </Reviews>
      <Price>2.300.000 VND</Price>
      <BriefTextsInfo>
        <TextItem>Chính hãng, Nguyên seal, Mới 100%</TextItem>
        <TextItem>Công nghệ màn hình: Quad HD+ HDR10+, 120Hz</TextItem>
        <TextItem>Màn hình rộng: 6.7 inch</TextItem>
        <TextItem>Hệ điều hành: Android 10.0; One UI 2</TextItem>
        <TextItem>CPU: Chip Exynos 990</TextItem>
        <TextItem>Camera sau: 12MP + 12MP + 64MP</TextItem>
        <TextItem>Camera trước: 10MP</TextItem>
        <TextItem>RAM: 8GB</TextItem>
        <TextItem>Bộ nhớ trong: 128GB</TextItem>
        <TextItem>Hỗ trợ thẻ nhớ: Khe thẻ nhớ mở rộng tới 1TB</TextItem>
        <TextItem>Thẻ SIM: 2 SIM</TextItem>
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
          <Span>Còn hàng</Span>
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
