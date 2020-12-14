import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <p className="navbar-brand">Kibo</p> {/* TODO: Link to homepage */}
      <a className="navbar-link" id="user-link">
        User
      </a>
      {/* TODO: Link to login/user page */}
    </nav>
  );
};

export default NavBar;
