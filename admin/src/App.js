import React, { useEffect } from "react";
import Navigation from "./components/Layout/navigation/navigation.component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "./pages/auth/auth.component";
import Management from "./pages/management/management.component";
import {
  selectCurrentUser,
  selectUserLoading,
} from "./redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchUser } from "./redux/user/user.actions";
import Spinner from "./components/UI/spinner/spinner.component";
import "./App.css";
function App({ user, fetchUser, loading }) {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  if (loading) return <Spinner />;
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            user ? <Redirect to="/management" /> : <Redirect to="/auth" />
          }
        />
        <Route
          path="/auth"
          render={(props) =>
            user ? <Redirect to="/management" /> : <Auth {...props} />
          }
        />
        <Route
          path="/management"
          render={(props) =>
            user ? <Management {...props} /> : <Redirect to="/auth" />
          }
        />
      </Switch>
    </Router>
  );
}
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  loading: selectUserLoading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
