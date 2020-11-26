import React, { Component } from "react";
import Login from "./login";
import SignUp from "./signup";

class Home extends Component {
  state = { status: "login" };

  handleAuth = (display) => {
    this.setState({ status: display });
  };

  render() {
    return (
      <div className="container-style">
        <h1 id="home-style">HOME</h1>
        <p className="login-style">
          <a href="#" onClick={() => this.handleAuth("login")}>
            Login
          </a>
          {" or "}
          <a href="#" onClick={() => this.handleAuth("signup")}>
            Sign Up
          </a>
          {" to Write!"}
        </p>

        {this.state.status == "login" ? <Login /> : <SignUp />}
      </div>
    );
  }
}

export default Home;
