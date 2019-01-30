import React from "react";
import { connect } from "react-redux";

import Welcome from "../Pages/Welcome";
import Posts from "../Pages/Posts";

const Home = ({ auth: { isAuthenticated } }) =>
  isAuthenticated ? <Posts /> : <Welcome />;

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(Home);
