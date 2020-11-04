import React, { Component } from "react";
import CreateButton from "./components/createButton";
import Entry from "./components/entry";
import EntryPrev from "./components/entryPrev";
import NavBar from "./components/navBar";
import Sidebar from "./components/sidebar";

class App extends Component {
  // TODO: change initial state to be whatever is in the database
  state = {
    history: [],
    currID: 0, // current highest ID assigned
    currTitle: "",
    currWords: "",
  };

  // todo: how should key ordering work?? if an entry is deleted, would the next entry created have its same key,
  // or do we just disregard the # for the deleted key??
  // creating new entry on push of create button
  handleCreate = () => {
    const history = [...this.state.history];
    const currID = this.state.currID + 1;

    history.push(
      <EntryPrev
        id={this.state.currID} // id of each individual entry preview
        title={this.state.currTitle}
        wordPrev={this.state.currWords}
      ></EntryPrev>
    );

    this.setState({ currID, history });
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
      <div className="App">
        <header id="header">
          <NavBar></NavBar>
        </header>
        <div id="main-container">
          <div id="sidebar" className="overflow-auto">
            <CreateButton onCreate={this.handleCreate}></CreateButton>
            <Sidebar history={this.state.history}></Sidebar>
          </div>
          <div id="entry">
            <Entry
              onTitleChange={this.handleTitleChange}
              onTextChange={this.handleTextChange}
            ></Entry>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
