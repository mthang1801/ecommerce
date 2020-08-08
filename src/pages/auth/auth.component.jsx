import React from "react";
import SignIn from "../../components/Auth/sign-in/sign-in.component";
import SignUp from "../../components/Auth/sign-up/sign-up.component";
import RestoreAccount from "../../components/Auth/restore-account/restore-account.component";
import RestoreAccountDone from "../../components/Auth/restore-account-done/restore-account-done.component";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

class AuthPage extends React.Component {
  render() {
    const { match, location, currentUser } = this.props;
    if (currentUser) {
      if (location.state) return <Redirect to={location.state.from} />;
      return <Redirect to="/" />;
    }
    return (
      <Switch>
        <Route
          path={`${match.path}/signin`}
          render={(props) => <SignIn authPath={match.path} {...props} />}
        />
        <Route
          path={`${match.path}/signup`}
          render={(props) => <SignUp authPath={match.path} {...props} />}
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


export default AuthPage;
