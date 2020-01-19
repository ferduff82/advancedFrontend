import React, { Component } from "react";

import Att from "./views/Att";
import Predict from "./views/Predict";
// TEMPORAL
import Working from './components/on-construction/working';
import Autonomous from './components/autonomous';
import Murmur from './components/murmur';
import Terms from './components/on-construction/terms';
import ProvidersTerms from './components/terms/Providers';

// Routes
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Styles
import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* Online Autonomous  */}
            <Route path={"/autonomous"} strict exact component={Autonomous} />
            <Route path={"/murmur"} strict exact component={Murmur} />


            {/* On-Construction temporal ccomponents */}
            <Route path={"/"} strict exact component={Working} />
            <Route path={"/terminos"} strict exact component={ProvidersTerms} />
            <Route
              path={"/terminos_traslados"}
              strict
              exact
              component={ProvidersTerms}
            />
            {/* Services */}
            <Route path={"/att/:dni?/:att?"} exact component={Att} />
            <Route path={"/predict"} exact component={Predict} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
