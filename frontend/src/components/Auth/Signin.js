import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { signinUser } from "../../actions/authActions";
import { AuthFormStyle, SigninStyle } from "../../styles";
import TextFieldGroup from "../Common/TextFieldGroup";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
      <SigninStyle className="container">
        <AuthFormStyle onSubmit={e => this.handleSubmit(e)}>
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button type="submit">Sign up</button>
        </AuthFormStyle>
      </SigninStyle>
    );
  }
}

Signin.protTypes = {
  auth: PropTypes.object.isRequired,
  signinUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signinUser }
)(Signin);
