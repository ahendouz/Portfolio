import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import PrivateRoute from "../lib/PrivateRoute";

import Navbar from "../components/Layout/Navbar";
import Home from "../components/Home";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateProfile from "../components/CreateProfile/CreateProfile";
import EditProfile from "../components/EditProfile/EditProfile";
import AddSkills from "../components/AddSkills/AddSkills";
import AddProjects from "../components/AddProjects/AddProjects";
import Profiles from "../components/Profiles/Profiles";
import Profile from "../components/Profile/Profile";
import Posts from "../components/Posts/Posts";
import Post from "../components/Post/Post";
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
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <PrivateRoute path="/add-skills" component={AddSkills} />
        <PrivateRoute path="/add-projects" component={AddProjects} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/profile/:handle" component={Profile} />
        <PrivateRoute path="/feed" component={Posts} />
        <PrivateRoute path="/post/:id" component={Post} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);
