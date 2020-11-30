import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  state = { email: "", username: "", password: "", confirm: "" };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleChangeConfirm = (event) => {
    this.setState({ confirm: event.target.value });
  };

  // send post request to database on submit
  handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirm: this.state.confirm,
    };

    // TODO: handle validation?? if validated, then reate new user & redirect to user entries

    axios
      .post(`http://localhost:5000/user/${this.state.username}/`, newUser)
      .then((res) => console.log(res.data));

    // append query string user = {username}

    // TODO: start session

    window.location = `entry?user=${this.state.username}`;
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label htmlFor="email" className="col-form-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            onChange={this.handleChangeEmail}
          />
        </div>
        <div className="form-group row">
          <label htmlFor="username" className="col-form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            onChange={this.handleChangeUsername}
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
            onChange={this.handleChangePassword}
          />
        </div>
        <div className="form-group row">
          <label htmlFor="confirm" className="col-form-label">
            Confirm Password
          </label>
          <input
            type="text"
            id="confirm"
            name="confirm"
            className="form-control"
            onChange={this.handleChangeConfirm}
          />
        </div>
        <input
          type="submit"
          value="Create Account"
          className="btn btn-lg btn-primary input"
        ></input>
      </form>
    );
  }
}

export default SignUp;
