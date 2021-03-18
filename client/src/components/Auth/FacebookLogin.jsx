import React from 'react'
import FacebookLogin from "react-facebook-login";
import {TiSocialFacebook} from "react-icons/ti"
import "./styles/FacebookLogin.styles.css";
import {loginFacebookStart} from "../../redux/user/user.actions";
import {connect} from "react-redux";
const FBLogin = ({loginFacebook}) => {
  const responseFacebook = response => {
    const {name, email, userID} = response; 
    loginFacebook(userID, name, email);
  }
  return (
    <FacebookLogin
      appId="1234252493592068"      
      fields="name,email,picture"
      icon={<TiSocialFacebook/>}
      callback={responseFacebook}      
      cssClass="btn-fb"
      textButton="Đăng nhập"
    />
  )
}
const mapDispatchToProps = dispatch => ({
  loginFacebook : (id, name, email)  => dispatch(loginFacebookStart(id, name,email))
})
export default connect(null, mapDispatchToProps)(FBLogin)
