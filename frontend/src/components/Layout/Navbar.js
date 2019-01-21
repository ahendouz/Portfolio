import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { NavbarStyle } from "../../styles";

const Navbar = ({
  logoutUser,
  clearCurrentProfile,
  auth: { isAuthenticated, user }
}) => {
  const onLogoutClick = e => {
    e.preventDefault();
    logoutUser();
    clearCurrentProfile();
  };

  const authenticated = (
    <div className="authenticated">
      <div className="avatar">
        <img
          className="rounded-circle"
          src={user.avatar}
          alt={user.name}
          style={{ width: "25px", marginRight: "5px" }}
          title="You must have a Gravatar connected to your email to display an image"
        />
      </div>
      <span onClick={e => onLogoutClick(e)} className="logout">
        Logout
      </span>
    </div>
  );

  const guest = (
    <ul className="guest">
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Link to="/signin">Sign In</Link>
      </li>
    </ul>
  );
  return (
    <NavbarStyle>
      <Link to="/">
        <h1>Portflio</h1>
      </Link>
      {isAuthenticated ? authenticated : guest}
    </NavbarStyle>
  );
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
  { logoutUser, clearCurrentProfile }
)(Navbar);
