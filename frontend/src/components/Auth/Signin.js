import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  state = {
    email: "",
    password: "",
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
    axios
      .post("/api/users/signin", { ...this.state })
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response }));
  };
  render() {
    const { email, password } = this.state;
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

export default Signin;
