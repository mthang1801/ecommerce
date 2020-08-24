import React, { useState, useEffect, useContext } from "react";
import { MasterHeaderContainer, Grid } from "./master-header.styles";
import CategoryOverview from "../category-overview/category-overview.component";
import MasterService from "../master-service/master-service.component";
import MasterSearch from "../master-search/master-search.component";
import AppContext from "../../../context/app-viewport.context";
const MasterHeader = (props) => {
  const [smallView, setSmallView] = useState(window.innerWidth < 992);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 992) {
      setSmallView(true);
    } else {
      setSmallView(false);
    }
  }, [width]);
  return (
    <MasterHeaderContainer smallView={smallView}>
      <Grid w20 smallView={smallView}>
        <CategoryOverview />
      </Grid>
      <Grid w55 smallView={smallView}>
        <MasterSearch />
      </Grid>
      <Grid w25 smallView={smallView}>
        <MasterService />
      </Grid>
    </MasterHeaderContainer>
  );
};

export default MasterHeader;
