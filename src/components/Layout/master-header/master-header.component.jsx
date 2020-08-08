import React, {useState, useEffect} from "react";
import { MasterHeaderContainer, Grid } from "./master-header.styles";
import CategoryOverview from "../category-overview/category-overview.component";
import MasterService from "../master-service/master-service.component";
import MasterSearch from "../master-search/master-search.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectIsMobile} from "../../../redux/checkViewPort/checkViewPort.selectors"
const MasterHeader = ({isMobile}) => {
  return (
    <MasterHeaderContainer isMobile={isMobile}>
      <Grid w25 isMobile={isMobile}>
        <CategoryOverview />
      </Grid>
      <Grid w50 isMobile={isMobile}>
        <MasterSearch />
      </Grid>
      <Grid w25 isMobile={isMobile}>
        <MasterService />
      </Grid>
    </MasterHeaderContainer>
  );
};

const MapStateToProps = createStructuredSelector({
  isMobile : selectIsMobile
})

export default connect(MapStateToProps)(MasterHeader);
