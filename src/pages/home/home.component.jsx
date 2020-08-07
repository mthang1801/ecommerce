import React from 'react';
import {HomePageContainer} from "./home.styles";
import BannerOverview from "../../components/HomePage/banner-overview/banner-overview.component"
import CategoriesSlider from "../../components/Layout/categories-slider/categories-slider.component";
import FeaturedProductOverview from "../../components/HomePage/featured-product-overview/featured-product-overview.component";
const HomePage = () => {
  return (
    <HomePageContainer>      
      <BannerOverview/>
      <CategoriesSlider />     
      <FeaturedProductOverview />
    </HomePageContainer>
  )
}

export default HomePage
