import React from 'react'
import {MasterOverViewContainer, Header, Body} from "./master-overview.styles";
import MasterSearchService from "../master-search-service/master-search-service.component";
import MasterBanner from "../master-banner/master-banner.component"
const MasterOverView = () => {
  return (
    <MasterOverViewContainer>
      <Header>
       <MasterSearchService/> 
      </Header>
      <Body>
        <MasterBanner />
      </Body>
    </MasterOverViewContainer>
  )
}

export default MasterOverView
