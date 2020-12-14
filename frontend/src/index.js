import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import Home from "./components/home";
import UserDetail from "./components/userDetail";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom"; // dynamic rendering
import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path={["/", "/login", "/signup"]} component={Home} />
        <Route path="/entry" component={App} />
        <Route path="/user/:username" component={UserDetail} />
        {/* TODO: make user component */}
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
