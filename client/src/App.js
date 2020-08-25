import React, { useEffect, Suspense } from "react";
import Toolbar from "./components/Layout/header/toolbar/toolbar.component";
import Navigation from "./components/Layout/navigations/navigations.component";
import Footer from "./components/Layout/footer/footer.component";
import Home from "./pages/home/home.component";
import ShopGrid from "./pages/shop-grid/shop-grid.component";
import Cart from "./pages/cart/cart.component";
import ShopDetails from "./pages/shop-details/shop-details.component";
import SideDrawer from "./components/Layout/header/side-drawer/side-drawer.component";
import Checkout from "./pages/checkout/checkout.component";
import Contact from "./pages/contact/contact.component";
import CreateProduct from "./pages/create-product/create-product.component";
import Authentication from "./pages/auth/auth.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useWindowSize from "./utils/useWindowSize.util";
import AppContext from "./context/app-viewport.context";
import GlobalStyle from "./global.styles";
import { default as RegisterSeller } from "./pages/register-seller/register-seller.container";
import { fetchUserStart } from "./redux/user/user.actions";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserLoading,
} from "./redux/user/user.selectors";
import ErrorBoundary from "./components/UI/error-boundary/error-boundary.component";
import Loader from "./components/UI/loader/loader.component";
function App({ fetchUser, user, loading }) {
  const [width] = useWindowSize();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading && !user) {
    return <Loader />;
  }
  return (
    <Router>
      <AppContext.Provider value={width}>
        <GlobalStyle />
        <SideDrawer />
        <Toolbar />
        <Navigation />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Route path="/" exact component={Home} />
              <Route path="/auth" component={Authentication} />
              <Route path="/shop-grid" component={ShopGrid} />
              <Route path="/cart" component={Cart} />
              <Route path="/details" component={ShopDetails} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/contact" component={Contact} />
              <Route path="/register-seller" component={RegisterSeller} />
              <Route path="/create-new-product" component={CreateProduct} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
        <Footer />
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
