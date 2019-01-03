import React, { Component } from "react";
import axios from "axios";

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
    axios
      .post("/api/users/signup", { ...this.state })
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response }));
  };
  render() {
    const { name, email, password, typeOfUser } = this.state;
    return (
      <div>
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

export default Signup;
