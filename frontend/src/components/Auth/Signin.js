import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { signinUser } from "../../actions/authActions";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const userInfo = { email, password };
    this.props.signinUser(userInfo);
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

// Signin.prototype = {};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signinUser }
)(Signin);
