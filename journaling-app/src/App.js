import React, { Component } from "react";
import Entry from "./components/entry";
import EntryPrev from "./components/entryPrev";
import NavBar from "./components/navBar";
import Sidebar from "./components/sidebar";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  // TODO: change initial state to be whatever is in the database
  state = {
    history: [],
    entries: [], // TODO: when database is set up, pull from there instead
    currId: 0, // current highest ID assigned
    currTitle: "",
    currWords: "",
  };

  // todo: how should key ordering work?? if an entry is deleted, would the next entry created have its same key,
  // or do we just disregard the # for the deleted key??
  // creating new entry on push of create button
  handleCreate = () => {
    const history = [...this.state.history];
    const entries = [...this.state.entries];
    const currId = this.state.currId + 1;

    history.push(
      <EntryPrev
        id={this.state.currId} // id of each individual entry preview
        title={this.state.currTitle}
        wordPrev={this.state.currWords}
      ></EntryPrev>
    );

    //entries.push(<Entry></Entry>);

    this.setState({ currId, history, entries });
  };

  // TODO: handle new entry preview on typing

  // notify entryPrev that entry has changed
  handleTitleChange = () => {
    const currTitle = document.getElementById("title").value;
    this.setState({ currTitle });
  };

  // notify entryPrev that text has changed
  handleTextChange = () => {
    const currWords = document.getElementById("text-area").value;
    this.setState({ currWords });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <header id="header">
            <NavBar></NavBar>
          </header>
          <div id="main-container">
            <Sidebar
              history={this.state.history}
              handleCreate={this.handleCreate}
              entryId={this.state.currId}
            ></Sidebar>
            <div id="entry">
              <Route path="/entry/:id" component={Entry}></Route>
              {/* <Entry
                onTitleChange={this.handleTitleChange}
                onTextChange={this.handleTextChange}
              ></Entry> */}
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
