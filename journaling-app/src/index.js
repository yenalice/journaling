import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Sidebar from "./components/sidebar";
import NavBar from "./components/navBar";
import Entry from "./components/entry";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>,
  document.getElementById("header")
);

ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>,
  document.getElementById("sidebar")
);

ReactDOM.render(
  <React.StrictMode>
    <Entry />
  </React.StrictMode>,
  document.getElementById("entry")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
