import React, { useEffect, Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useWindowSize from "../utils/useWindowSize.util";
import AppContext from "../context/app-viewport.context";
import GlobalStyles from "./GlobalStyles";
import { fetchUserStart } from "../redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserLoading,
} from "../redux/user/user.selectors";
import ErrorBoundary from "../components/UI/error-boundary/error-boundary.component";
import Loader from "../components/UI/loader/loader.component";
import useStaticData from "../hooks/useStaticData"

const Home = lazy(() => import("../pages/Home"));
const RegisterSeller = lazy(() =>
  import("../pages/RegisterSeller")
);
const PostProduct = lazy(() => import("../pages/PostProduct"));
const Admin = lazy(() => import("../pages/Admin"))

const Authentication = lazy(() => import("../pages/auth/auth.component"));

function App({ fetchUser, user, loading }) {
  const [width] = useWindowSize();  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useStaticData();

  if (loading && !user) {
    return <Loader />;
  }
  return (
    <Router>
      <AppContext.Provider value={width}>
        <GlobalStyles />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact component={Home} />              
              <Route path="/auth" component={Authentication} />              
              <Route path="/register-seller" component={RegisterSeller} />              
              <Route path="/post-product" component={PostProduct}/>
              <Route path="/admin" component={Admin}/>
              
             
            </Switch>
          </Suspense>
        </ErrorBoundary>

        {/* <Footer /> */}
      </AppContext.Provider>
    </Router>
  );
}
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  loading: selectUserLoading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUserStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
