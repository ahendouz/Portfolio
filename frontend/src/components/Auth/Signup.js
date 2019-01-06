import React, { Component } from "react";
// import axiols from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signupUser } from "../actions/authActions";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    typeOfUser: "designer",
    errors: ""
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // axios
    //   .post("/api/users/signup", { ...this.state })
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response }));
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      typeOfUser: this.state.typeOfUser
    };
    this.props.signupUser(newUser);

    console.log(this.props.signupUser);
  };
  render() {
    const { name, email, password, typeOfUser } = this.state;
    const { user } = this.props.auth;
    return (
      <div>
        {user ? user.name : null}
        <form onSubmit={e => this.handleSubmit(e)}>
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
        </form>
      </div>
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
)(Signup);
