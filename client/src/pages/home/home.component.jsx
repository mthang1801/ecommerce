import React, {useEffect} from 'react';
import {HomePageContainer} from "./home.styles";
import BannerOverview from "../../components/HomePage/banner-overview/banner-overview.component"
import CategoriesSlider from "../../components/Layout/categories-slider/categories-slider.component";
import FeaturedProductOverview from "../../components/HomePage/featured-product-overview/featured-product-overview.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
const HomePage = () => {  
  useEffect(() => {
    window.scrollTo({
      top : 0 ,
      behavior : "auto"
    })
  }, [])
  return (
    <HomePageContainer>      
      <MasterHeader/>
      <BannerOverview/>
      <CategoriesSlider />     
      <FeaturedProductOverview />
    </HomePageContainer>
  )
}

export default HomePage
