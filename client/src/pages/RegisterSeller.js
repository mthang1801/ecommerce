import React, { useEffect } from "react";
import Layout from "../containers/Layout";
import { selectCurrentUser } from "../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import CardRequestLoginSignup from "../components/Card/CardRequestLoginSignup";
import Steppers from "../components/RegisterSeller/Steppers"
import {Redirect, withRouter} from "react-router-dom"

const RegisterSeller = ({ user, history, location }) => {
  console.log(location)
  if (!user)
    return (
      <Layout>
        <CardRequestLoginSignup />
      </Layout>
    );
  if(user && user.role === "seller") return <Redirect to={{pathname : location.state ?location.state.from : "/" }}/>
  return <Layout>
    <Steppers/>
  </Layout>;
};

const mapStatesToProps = createStructuredSelector({
  user: selectCurrentUser,
});
export default connect(mapStatesToProps)(withRouter(RegisterSeller));
