import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "../lib/PrivateRoute";

import Navbar from "../components/Layout/Navbar";
import Home from "../components/Home";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateProfile from "../components/CreateProfile/CreateProfile";
import EditProfile from "../components/EditProfile/EditProfile";
import Footer from "../components/Layout/Footer";

export const Root = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/create-profile" component={CreateProfile} />
        <Route path="/edit-profile" component={EditProfile} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);
