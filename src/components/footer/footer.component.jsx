import React from "react";
import {
  FooterContainer,
  FooterAbout,
  FooterLogoContainer,
  FooterLogo,
  UnorderList,
  List,
  FooterWidget,
  FooterContact,
  Title,
  Grid,
  Side,
  CustomLink,
  SubTitle,
  Form,
  Input,
  Button,
  Icons,
  SocialLink
} from "./footer.styles";
import Logo from "../../assets/img/logo.png";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
} from "react-icons/ti";
const Footer = () => {
  return (
    <FooterContainer>
      <FooterAbout>
        <FooterLogoContainer to="/">
          <FooterLogo src={Logo} />
        </FooterLogoContainer>
        <UnorderList>
          <List>Address: 60-49 Road 11378 New York</List>
          <List>Phone: +65 11.188.888</List>
          <List>Email: hello@colorlib.com</List>
        </UnorderList>
      </FooterAbout>
      <FooterWidget>
        <Title>Useful Link</Title>
        <Grid>
          <Side>
            <CustomLink to="/">About Us</CustomLink>
            <CustomLink to="/">About Our Shop</CustomLink>
            <CustomLink to="/">Secure Shopping</CustomLink>
            <CustomLink to="/">Delivery information</CustomLink>
            <CustomLink to="/">Privacy Policy</CustomLink>
            <CustomLink to="/">Our Sitemap</CustomLink>
          </Side>
          <Side>
            <CustomLink to="/">Who We Are</CustomLink>
            <CustomLink to="/">Our Service</CustomLink>
            <CustomLink to="/">Projects</CustomLink>
            <CustomLink to="/">Contact</CustomLink>
            <CustomLink to="/">Innovation</CustomLink>
            <CustomLink to="/">Testimonials</CustomLink>
          </Side>
        </Grid>
      </FooterWidget>
      <FooterContact>
        <Title>Join Our Newsletter Now</Title>
        <SubTitle>
          Get E-mail updates about our latest shop and special offers.
        </SubTitle>
        <Form>
          <Input type="text" placeholder="Enter your email" />
          <Button>Subcribe</Button>
        </Form>
        <Icons>
          <SocialLink to="/">
            <TiSocialFacebook />
          </SocialLink>
          <SocialLink to="/">
            <TiSocialInstagram />
          </SocialLink>
          <SocialLink to="/">
            <TiSocialTwitter />
          </SocialLink>
        </Icons>
      </FooterContact>
    </FooterContainer>
  );
};

export default Footer;
