import React from "react";
import { HeroContainer } from "./hero.styles";
import CategoryOverview from "../category-overview/category-overview.component";
import MasterOverview from "../master-overview/master-overview.component";
const Hero = () => {
  return (
    <HeroContainer>
      <CategoryOverview />
      <MasterOverview/>
    </HeroContainer>
  );
};

export default Hero;
