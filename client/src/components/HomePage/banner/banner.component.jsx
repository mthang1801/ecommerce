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
const MasterBanner = ({img, height, linkUrl}) => {
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
      <a href={linkUrl}>
        <MasterBannerContainer img={img} mobileView={mobileView} height={height} />
      </a>
  );
};

export default MasterBanner;
