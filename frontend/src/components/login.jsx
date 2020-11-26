import React, { Component } from "react";

class Login extends Component {
  state = {};

  handleSubmit = () => {};

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
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary input"
        ></input>
      </form>
    );
  }
}

export default Login;
