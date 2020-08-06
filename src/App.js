import React, { useEffect } from "react";
import Toolbar from "./components/Layout/header/toolbar/toolbar.component";
import Navigation from "./components/Layout/navigations/navigations.component";
import Footer from "./components/Layout/footer/footer.component";
import Home from "./pages/home/home.component";
import ShopGrid from "./pages/shop-grid/shop-grid.component";
import Cart from "./pages/cart/cart.component";
import MasterHead from "./components/Layout/master-header/master-header.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Toolbar />
      <Navigation />
      <MasterHead />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop-grid" component={ShopGrid} />
        <Route path="/cart" component={Cart} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
