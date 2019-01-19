import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { signupUser } from "../../actions/authActions";
import { AuthFormStyle, SignupStyle } from "../../styles";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    typeOfUser: "designer",
    errors: {}
  };

  componentDidMount = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps = nextProps => {
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
    const { name, email, password, typeOfUser } = this.state;
    const newUser = { name, email, password, typeOfUser };
    this.props.signupUser(newUser, this.props.history);
  };
  render() {
    const { name, email, password, typeOfUser } = this.state;
    const { user } = this.props.auth;
    return (
      <SignupStyle className="container">
        {user ? user.name : null}
        <AuthFormStyle onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            name="name"
            placeholder="Your fullname"
            value={name}
            onChange={this.handleChange}
          />
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
          <select
            type="text"
            name="typeOfUser"
            value={typeOfUser}
            onChange={this.handleChange}
          >
            <option value="designer">Designer</option>
            <option value="developer">Developer</option>
          </select>
          <button type="submit">Sign up</button>
        </AuthFormStyle>
      </SignupStyle>
    );
  }
}

Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signupUser }
)(withRouter(Signup));
