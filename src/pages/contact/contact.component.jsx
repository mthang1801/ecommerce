import React from 'react'
import {ContactPageContainer} from "./contact.styles";
import Background  from "../../components/Layout/background/background.component";
import ContactOverview from "../../components/Contact/contact-overview/contact-overview.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
const ContactPage = () => {
  return (
    <ContactPageContainer>
      <MasterHeader/>
      <Background label="Contact"/>
      <ContactOverview/>      
    </ContactPageContainer>
  )
}

export default ContactPage
