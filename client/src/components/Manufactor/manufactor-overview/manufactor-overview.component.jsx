import React, {useState, useContext, useEffect} from "react";
import {ManufactorOverviewWrapper, Grid} from "./manufactor-overview.styles";
import ManufactorLeftSide from "../manufactor-left-side/manufactor-left-side.component";
import ManufactorRightSide from "../manufactor-right-side/manufactor-right-side.component";
import AppContext from "../../../context/app-viewport.context";
const ManufactorOverview = () => {
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
    <ManufactorOverviewWrapper mobileView={mobileView}>     
      <Grid w25 mobileView={mobileView} tabletView={tabletView}>
        <ManufactorLeftSide mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <ManufactorRightSide  mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
    </ManufactorOverviewWrapper>
  );
};

export default ManufactorOverview;
