import React, {useState, useContext, useEffect} from "react";
import {CategoryOverviewWrapper, Grid} from "./category-overview.styles";
import CategoryLeftSide from "../category-left-side/category-left-side.component";
import CategoryRightSide from "../category-right-side/category-right-side.component";
import AppContext from "../../../context/app-viewport.context";
const CategoryOverview = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 660);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 660) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 660) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  
  return (
    <CategoryOverviewWrapper mobileView={mobileView}>     
      <Grid w25 mobileView={mobileView} tabletView={tabletView}>
        <CategoryLeftSide mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <CategoryRightSide  mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
    </CategoryOverviewWrapper>
  );
};

export default CategoryOverview;
