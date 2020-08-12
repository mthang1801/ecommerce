import React from "react";
import Navigation from "./components/Layout/navigation/navigation.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./pages/category-management/category-management.component";
import ProductTypes from "./pages/product-types-management/product-types-management.component";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="row">
        <Navigation />
        <Switch>
          <Route path="/management/category" component={Category} />
          <Route path="/management/product-types" component={ProductTypes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
