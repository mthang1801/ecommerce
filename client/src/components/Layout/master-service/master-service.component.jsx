import React from 'react'
import {MasterServiceContainer, IconService, DetailService, PhoneNumber, SubDetail} from "./master-service.styles";
import {FaPhone} from "react-icons/fa";
import Icon from "../../UI/custom-icon/custom-icon.component";
const MasterService = () => {
  return (
    <MasterServiceContainer>
      <IconService>
        <Icon icon={<FaPhone/>} color="#7fad39"/>
      </IconService>
      <DetailService>
        <PhoneNumber>+(0123)-456 789</PhoneNumber>
        <SubDetail>support 24/7/365</SubDetail>
      </DetailService>
    </MasterServiceContainer>
  )
}

export default MasterService
