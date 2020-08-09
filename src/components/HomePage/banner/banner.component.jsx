import React, { useState , useEffect, useContext} from "react";
import {
  MasterBannerContainer,
  MainTitle,
  SubTitle,
  Notice,
  Button,
  Span,
} from "./banner.styles";
import BgImage from "../../../assets/img/hero/banner.jpg";
import AppContext from "../../../context/app-viewport.context";
const MasterBanner = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 600) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [width]);
  return (
    <MasterBannerContainer img={BgImage} mobileView={mobileView} >      
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
