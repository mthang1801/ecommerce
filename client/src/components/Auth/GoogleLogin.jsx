import React from 'react'
import GoogleLogin from 'react-google-login';
import {loginGoogleStart} from "../../redux/user/user.actions";
import {connect} from "react-redux";
const GGLogin = ({loginGoogle}) => {
  const responseGoogle = (response) => {
    console.log(response)
    const {googleId} = response;
    let {name,email} = response.profileObj;
    if(!name){
      name = `${response.profileObj.givenName} ${response.profileObj.familyName}` || "Người dùng mới"
    }
    loginGoogle(googleId,name,email)
  }
  return (
    <GoogleLogin
    clientId="660605287272-bcknbfn9c01uuf8rimiefiblh5587gij.apps.googleusercontent.com"
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
