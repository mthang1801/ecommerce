import React, {useContext, useEffect, useState} from 'react'
import {BannerOverViewContainer, Grid, Carousel, SmallBanner} from "./banner-overview.styles";
import Banner from "../banner/banner.component"
import AppContext from "../../../context/app-viewport.context";
import CarouselBanners from "../carousel-banners/carousel-banners.component";
import bannersData from "../../../data/banner";
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
      <Grid w60>
        <Carousel>
          <CarouselBanners/>
        </Carousel>
        {bannersData.filter((_,idx) => idx < 2).map((item) => (
          <Banner key={item.imageUrl} img={item.imageUrl} linkUrl={item.linkUrl} />
        ))}
      </Grid>   
  
      <Grid>
        {bannersData.filter((_,idx) => idx >= 2).map((item) => (
          <Banner key={item.imageUrl} img={item.imageUrl} linkUrl={item.linkUrl} />
        ))}
      </Grid>
              
    </BannerOverViewContainer>
  )
}

export default BannerOverView
