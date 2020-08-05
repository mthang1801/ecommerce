import React from 'react'
import {MasterSearchServiceContainer,SearchSection, ServiceSection} from "./master-search-service.styles";
import MasterSearch from "../master-search/master-search.component";
import MasterService from "../master-service/master-service.component";
const MasterSearchService = () => {
  return (
    <MasterSearchServiceContainer>
      <SearchSection>
        <MasterSearch/>
      </SearchSection>
      <ServiceSection>
        <MasterService/>
      </ServiceSection>
    </MasterSearchServiceContainer>
  )
}

export default MasterSearchService
