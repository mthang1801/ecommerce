import React, {useContext, useEffect, useState} from 'react'
import {BannerOverViewContainer} from "./banner-overview.styles";
import Banner from "../banner/banner.component"
import AppContext from "../../../context/app-viewport.context";
const BannerOverView = () => {
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext); 
  useEffect(() => {
    if(width < 992){
      setSmallView(true);
    }else{
      setSmallView(false);
    }
  }, [width]);

  return (
    <BannerOverViewContainer smallView={smallView}>           
      <Banner />         
    </BannerOverViewContainer>
  )
}

export default BannerOverView
