import React from 'react';
import {HomePageContainer} from "./home.styles";

import Hero from "../../components/hero/hero.component";
import CategoriesSlider from "../../components/categories-slider/categories-slider.component";
import FeaturedProductOverview from "../../components/featured-product-overview/featured-product-overview.component";
const HomePage = () => {
  return (
    <HomePageContainer>
      <Hero />
      <CategoriesSlider />
      <FeaturedProductOverview />
    </HomePageContainer>
  )
}

export default HomePage
