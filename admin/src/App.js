import React from "react";
import Navigation from "./components/Layout/navigation/navigation.component";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Auth from "./pages/auth/auth.component";
import Management from "./pages/management/management.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";
function App({ user }) {
  return (
    <Router>
      <Switch>
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
});
export default connect(mapStateToProps)(App);
