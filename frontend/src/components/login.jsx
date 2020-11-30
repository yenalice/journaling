import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = { username: "", password: "" };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  // TODO: FIX
  handleSubmit = async (event) => {
    event.preventDefault();

    const params = {
      username: this.state.username,
      password: this.state.password,
    };

    const check = await axios
      .get(`http://localhost:5000/user/${this.state.username}`, {
        params,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("Err: " + err));

    // TODO: authentication

    // append query string

    window.location = `entry?user=${this.state.username}`;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="username" className="col-form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div className="form-group row">
          <label htmlFor="password" className="col-form-label">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            className="form-control"
            onChange={this.handlePasswordChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-lg btn-primary input"
        ></input>
      </form>
    );
  }
}

export default Login;
