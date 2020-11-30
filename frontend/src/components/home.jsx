import React, { Component } from "react";
import { Link } from "react-router-dom";
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
          <Link to="/login" onClick={() => this.handleAuth("login")}>
            Login
          </Link>
          {" or "}
          <Link to="/signup" onClick={() => this.handleAuth("signup")}>
            Sign Up
          </Link>
          {" to Write!"}
        </p>

        {this.state.status === "login" ? <Login /> : <SignUp />}
      </div>
    );
  }
}

export default Home;
