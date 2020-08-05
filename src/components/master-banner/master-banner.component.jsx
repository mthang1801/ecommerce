import React, { useState } from "react";
import {
  MasterBannerContainer,
  MainTitle,
  SubTitle,
  Notice,
  Button,
  Span,
  BackgroundContainer,
  BackgroundImage,
} from "./master-banner.styles";
import BgImage from "../../assets/img/hero/banner.jpg";
const MasterBanner = () => {
  
  return (
    <MasterBannerContainer img={BgImage}>      
      <MainTitle>fruit fresh</MainTitle>
      <SubTitle>
        <Span>Vegetable</Span>
        <Span>100% Organic</Span>
      </SubTitle>
      <Notice>Free Pickup and Delivery Available</Notice>
      <Button>Shop Now</Button>
    </MasterBannerContainer>
  );
};

export default MasterBanner;
