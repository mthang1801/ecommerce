import React, {lazy} from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectCurrentUser} from "../../redux/user/user.selectors"
const SignIn = lazy(() => import("../../components/Auth/SignIn"));
const SignUp = lazy(() => import("../../components/Auth/SignUp"));
const RestoreAccount = lazy(() => import("../../components/Auth/RestoreAccount"));
const RestoreAccountDone = lazy(() => import("../../components/Auth/RestoreAccountDone"));
class AuthPage extends React.Component {
  
  render() {    
    const { match, location, user } = this.props;
    console.log(location)
    if (user) {
      if (location.state) return <Redirect to={location.state.from} />;
      return <Redirect to="/" />;
    }   
    return (
      <Switch>       
        <Route
          exact
          path={`${match.path}`}
          render={(props) => <SignIn authPath={match.path} {...props} />}
        />
        <Route
          path={`${match.path}/signup`}
          exact
          render={(props) => <SignUp authPath={match.path}  {...props} />}
        />
        <Route
          path={`${match.path}/restore-account`}
          exact
          render={(props) => (
            <RestoreAccount authPath={match.path} {...props} />
          )}
        />
        <Route
          path={`${match.path}/restore-account`}
          component={RestoreAccountDone}
        />
      </Switch>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user : selectCurrentUser
})

export default connect(mapStateToProps)(AuthPage);
