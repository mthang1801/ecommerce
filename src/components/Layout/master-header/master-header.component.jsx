import React from "react";
import { MasterHeaderContainer, Grid } from "./master-header.styles";
import CategoryOverview from "../category-overview/category-overview.component";
import MasterService from "../master-service/master-service.component";
import MasterSearch from "../master-search/master-search.component";
const MasterHeader = () => {
  return (
    <MasterHeaderContainer>
      <Grid w25>
        <CategoryOverview />
      </Grid>
      <Grid w50>
        <MasterSearch />
      </Grid>
      <Grid w25>
        <MasterService />
      </Grid>
    </MasterHeaderContainer>
  );
};

export default MasterHeader;
