import React, { useEffect, Suspense, lazy, useContext } from "react";
import Toolbar from "./components/Layout/header/toolbar/toolbar.component";
import Navigation from "./components/Layout/navigations/navigations.component";
import Footer from "./components/Layout/footer/footer.component";
import SideDrawer from "./components/Layout/header/side-drawer/side-drawer.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useWindowSize from "./utils/useWindowSize.util";
import AppContext from "./context/app-viewport.context";
import GlobalStyle from "./global.styles";
import { fetchUserStart } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserLoading,
} from "./redux/user/user.selectors";
import ErrorBoundary from "./components/UI/error-boundary/error-boundary.component";
import Loader from "./components/UI/loader/loader.component";

const Category = lazy(() => import("./pages/category/category.component"));
const Home = lazy(() => import("./pages/home/home.component"));
const Cart = lazy(() => import("./pages/cart/cart.component"));
const ShopDetails = lazy(() =>
  import("./pages/product-detail/product-detail.component")
);
const Checkout = lazy(() => import("./pages/checkout/checkout.container"));
const Contact = lazy(() => import("./pages/contact/contact.component"));
const CreateProduct = lazy(() =>
  import("./pages/create-product/create-product.component")
);
const Authentication = lazy(() => import("./pages/auth/auth.component"));
const ProductType = lazy(() =>
  import("./pages/product-type/product-type.component")
);
const ProductDetail = lazy(() =>
  import("./pages/product-detail/product-detail.component")
);
const ProductGroup = lazy(() =>
  import("./pages/product-group/product-group.component")
);
const Manufactor = lazy(() =>
  import("./pages/manufactor/manufactor.component")
);
const OrderedHistory = lazy(() => import("./pages/ordered/ordered.component"));
const ProductReviews = lazy(() =>
  import("./pages/product-reviews/product-reviews.component")
);
const RegisterSeller = lazy(() =>
  import("./pages/register-seller/register-seller.container")
);
const ProductSearch = lazy(() =>
  import("./pages/product-search/product-search.component")
);
function App({ fetchUser, user, loading }) {
  const [width] = useWindowSize();
  console.log(width);
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
        {width < 992 ? <SideDrawer /> : null}
        <Toolbar />
        <Navigation />

        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/auth" component={Authentication} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/details" exact component={ShopDetails} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/ordered-history" exact component={OrderedHistory} />
              <Route path="/search" exact component={ProductSearch} />
              <Route path="/category/:categoryId" component={Category} />
              <Route
                path="/product-type/:productTypeId"
                component={ProductType}
              />
              <Route
                path="/product/reviews/:productId"
                component={ProductReviews}
              />
              <Route
                path="/product-group/:productGroupId"
                exact
                component={ProductGroup}
              />
           
              <Route path="/register-seller" exact component={RegisterSeller} />
              <Route
                path="/:categoryPath/:productTypePath/product-group/:productGroupPath/products"
                exact
                component={ProductGroup}
              />
              <Route
                path="/:categoryPath/products"
                exact
                component={Category}
              />
              <Route
                path="/manufactor/:manufactorPath/products"
                exact
                component={Manufactor}
              />
              
              <Route
                path="/create-new-product"
                exact
                component={CreateProduct}
              />
              <Route
                path="/manufactor/:manufactorPath"
                exact
                component={Manufactor}
              />
              <Route
                path="/:categoryPath/:productTypePath/:productPath"
                component={ProductDetail}
              />
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
