import React, { useEffect } from "react";
import Toolbar from "./components/Layout/header/toolbar/toolbar.component";
import Navigation from "./components/Layout/navigations/navigations.component";
import Footer from "./components/Layout/footer/footer.component";
import Home from "./pages/home/home.component";
import ShopGrid from "./pages/shop-grid/shop-grid.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Toolbar />
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop-grid" component={ShopGrid} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
