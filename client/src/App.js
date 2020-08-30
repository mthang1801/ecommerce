import React, { useEffect, Suspense } from "react";
import Toolbar from "./components/Layout/header/toolbar/toolbar.component";
import Navigation from "./components/Layout/navigations/navigations.component";
import Footer from "./components/Layout/footer/footer.component";
import Home from "./pages/home/home.component";
import Cart from "./pages/cart/cart.component";
import ShopDetails from "./pages/shop-details/shop-details.component";
import SideDrawer from "./components/Layout/header/side-drawer/side-drawer.component";
import Checkout from "./pages/checkout/checkout.component";
import Contact from "./pages/contact/contact.component";
import CreateProduct from "./pages/create-product/create-product.component";
import Authentication from "./pages/auth/auth.component";
import Category from "./pages/category/category.component";
import ProductType from "./pages/productType/productType.component";
import Product from "./pages/product/product.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useWindowSize from "./utils/useWindowSize.util";
import AppContext from "./context/app-viewport.context";
import GlobalStyle from "./global.styles";
import { default as RegisterSeller } from "./pages/register-seller/register-seller.container";
import { fetchUserStart } from "./redux/user/user.actions";
import PageNotFound from "./pages/page-not-found/page-not-found.component";
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

        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/auth" exact component={Authentication} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/details" exact component={ShopDetails} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/register-seller" exact component={RegisterSeller} />
              <Route path="/:categoryUrl/products" exact component={Category} />
              <Route
                path="/create-new-product"
                exact
                component={CreateProduct}
              />
              <Route
                path="/:categoryUrl/:productTypeUrl/:productUrl"
                component={Product}
              />
              <Route
                path="/:categoryUrl/:productTypeUrl"
                component={ProductType}
              />

              <Route path="/:categoryUrl" component={Category} />
            </Switch>
          </Suspense>
        </ErrorBoundary>

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
