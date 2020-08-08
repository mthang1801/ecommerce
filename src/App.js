import React, { useLayoutEffect, useEffect } from "react";
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
  setViewPortDesktop,
  setViewPortMobile,
} from "./redux/checkViewPort/checkViewPort.actions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useWindowSize from "./utils/useWindowSize.util";
function App({ setViewPortDesktop, setViewPortMobile }) {
  const [width] = useWindowSize();
  useEffect(() => {
    if (width < 992) {
      console.log(width);
      setViewPortMobile();
    } else {
      setViewPortDesktop();
    }
  }, [width]);
  return (
    <Router>
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
      </Switch>
      <Footer />
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setViewPortMobile: () => dispatch(setViewPortMobile()),
  setViewPortDesktop: () => dispatch(setViewPortDesktop()),
});

export default connect(null, mapDispatchToProps)(App);
