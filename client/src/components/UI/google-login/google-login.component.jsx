import React from 'react'
import GoogleLogin from 'react-google-login';
import {loginGoogleStart} from "../../../redux/user/user.actions";
import {connect} from "react-redux";
const GGLogin = ({loginGoogle}) => {
  const responseGoogle = (response) => {
    const {googleId} = response;
    const {name,email} = response.profileObj;
    loginGoogle(googleId,name,email)
  }
  return (
    <GoogleLogin
    clientId="660605287272-v637s9vnt3dpueqm49iv1s5iq6gap3gf.apps.googleusercontent.com"
    buttonText="Login"   
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}    
    buttonText="Đăng nhập"    
    prompt="select_account"
  />
  )
}
const mapDispatchToProps = dispatch => ({
  loginGoogle : (id,name, email) => dispatch(loginGoogleStart(id, name, email))
})
export default connect(null, mapDispatchToProps)(GGLogin)
