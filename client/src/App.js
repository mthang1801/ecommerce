import React, { useEffect } from "react";
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
import Authentication from "./pages/auth/auth.component";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import useWindowSize from "./utils/useWindowSize.util";
import AppContext from "./context/app-viewport.context";
import GlobalStyle from "./global.styles";
import { default as Seller } from "./pages/seller/seller.container";
import { fetchUserStart } from "./redux/user/user.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
function App({ fetchUser, user }) {
  const [width] = useWindowSize();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <Router>
      <AppContext.Provider value={width}>
        <GlobalStyle />
        <SideDrawer />
        <Toolbar />
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={Authentication} />
          <Route path="/shop-grid" component={ShopGrid} />
          <Route path="/cart" component={Cart} />
          <Route path="/details" component={ShopDetails} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/contact" component={Contact} />
          <Route path="/seller" component={Seller} />
        </Switch>
        <Footer />
      </AppContext.Provider>
    </Router>
  );
}
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUserStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
