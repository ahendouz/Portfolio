import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "../components/Layout/Navbar";
import Home from "../components/Home";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import Footer from "../components/Layout/Footer";

export const Root = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);
