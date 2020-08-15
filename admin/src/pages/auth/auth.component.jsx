import React from 'react'
import {AuthWrapper} from "./auth.styles";
import SignIn from "../../components/Auth/signin/signin.component";
import SignUp from "../../components/Auth/signup/signup.component"
import {Route} from "react-router-dom"
const Auth = ({match}) => {
  console.log(match)
  return (
    <AuthWrapper>
      <Route exact path={`${match.path}`} component={SignIn}/>
      <Route path={`${match.path}/signup`} component={SignUp} />
    </AuthWrapper>
  )
}

export default Auth
