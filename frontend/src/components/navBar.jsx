import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <p className="navbar-brand">Kibo</p> {/* TODO: Link to homepage */}
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
        <a className="navbar-link" id="user-link">
          User
        </a>
        {/* TODO: Link to login/user page */}
      </form>
    </nav>
  );
};

export default NavBar;
