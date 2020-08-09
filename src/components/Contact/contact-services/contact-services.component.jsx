import React from 'react'
import {ContactServicesContainer, ServiceItem, Icon, Label, Text} from "./contact-services.styles";
import {FaPhone} from "react-icons/fa"
import {MdLocationOn} from "react-icons/md"
import {BsClock} from "react-icons/bs"
import {AiOutlineMail} from "react-icons/ai"
const ContactServices = ({mobileView, tabletView}) => {
  return (
    <ContactServicesContainer mobileView={mobileView} tabletView={tabletView}>
      <ServiceItem  mobileView={mobileView} tabletView={tabletView}>
        <Icon><FaPhone/></Icon>
        <Label>Phone</Label>
        <Text>+01-3-8888-6868</Text>
      </ServiceItem>
      <ServiceItem  mobileView={mobileView} tabletView={tabletView}>
        <Icon><MdLocationOn/></Icon>
        <Label>Address</Label>
        <Text>60-49 Road 11378 New York</Text>
      </ServiceItem>
      <ServiceItem  mobileView={mobileView} tabletView={tabletView}>
        <Icon><BsClock/></Icon>
        <Label>Open time</Label>
        <Text>10:00 am to 22:00 pm</Text>
      </ServiceItem>
      <ServiceItem  mobileView={mobileView} tabletView={tabletView}>
        <Icon><AiOutlineMail/></Icon>
        <Label>Email</Label>
        <Text>hello@colorlib.com</Text>
      </ServiceItem>
    </ContactServicesContainer>
  )
}

export default ContactServices
