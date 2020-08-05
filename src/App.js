import React, { useEffect } from "react";
import Toolbar from "./components/Layout/header/toolbar/toolbar.component";
import Navigation from "./components/Layout/navigations/navigations.component";
import Footer from "./components/Layout/footer/footer.component";
import Home from "./pages/home/home.component";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <Toolbar />
      <Navigation />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
