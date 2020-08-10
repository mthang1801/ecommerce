import React from 'react'
import {MasterOverViewContainer, Header, Body} from "./master-overview.styles";
import MasterBanner from "../master-banner/master-banner.component"
const MasterOverView = () => {
  return (
    <MasterOverViewContainer>     
      <Body>
        <MasterBanner />
      </Body>
    </MasterOverViewContainer>
  )
}

export default MasterOverView
