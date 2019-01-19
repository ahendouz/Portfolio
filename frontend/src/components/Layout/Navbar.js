import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";

const Navbar = ({ logoutUser, auth: { isAuthenticated, user } }) => {
  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
  };

  const authLinks = (
    <div href="" onClick={e => onLogoutClick(e)}>
      <img
        className="rounded-circle"
        src={user.avatar}
        alt={user.name}
        style={{ width: "25px", marginRight: "5px" }}
        title="You must have a Gravatar connected to your email to display an image"
      />{" "}
      Logout
    </div>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signin">
          Sign In
        </Link>
      </li>
    </ul>
  );
  return isAuthenticated ? authLinks : guestLinks;
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
