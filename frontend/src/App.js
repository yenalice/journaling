import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Entry from "./components/entry";
import NavBar from "./components/navBar";
import Sidebar from "./components/sidebar";
import * as entryActions from "./actions/entryActions";

class App extends Component {
  state = {
    title: "",
    text: "",
  };

  /* load sidebar of entry previews and the entry display */
  // TODO: change hardcoded "yenalice" to match session/current user
  componentDidMount = async () => {
    await this.props.entriesInitialized();
    this.setEntryDisplay(this.props.selected);
  };

  /* store changes to title box */
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  /* store changes to text box */
  handleTextChange = (event) => {
    const val = event.value;
    this.setState({ text: val.substring(3, val.length - 4) });
  };

  /* create new entry */
  handleCreate = async () => {
    await this.props.entryCreated();
    this.setEntryDisplay(this.props.selected);
  };

  /* create new entry */
  handleDelete = async (id) => {
    // delete current selected entry
    // popup appears - "Are you sure you want to delete this entry?"
    // if yes, then:
    await this.props.entryDeleted(id);
    this.setEntryDisplay(this.props.selected);
  };

  /* highlight entryPrev selected & load info of selected entry into display */
  handleSelectEntry = (id) => {
    this.props.changeSelected(id);
    this.setEntryDisplay(id);
  };

  /* save entry changes to database */
  handleEntrySave = (event) => {
    event.stopPropagation();

    const id = this.props.selected;
    const title = this.state.title;
    const text = this.state.text;
    const data = { title, text };

    axios
      .post(`http://localhost:5000/entry/${id}?user=yenalice`, data)
      .then(() => {
        this.props.entryModified(id, title, text);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* set entry title & text using id */
  setEntryDisplay = (id) => {
    axios
      .get(`http://localhost:5000/entry/${id}?user=yenalice`)
      .then((res) => {
        this.setState({ title: res.data.title, text: res.data.text });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <header id="header">
          <NavBar />
        </header>
        <div id="main-container">
          <Sidebar
            entryHistory={this.props.entryList}
            onCreate={this.handleCreate}
            onDelete={(id) => this.handleDelete(id)}
            onSelectEntry={(id) => this.handleSelectEntry(id)}
          />
          <div id="entry">
            <Entry
              title={this.state.title}
              text={this.state.text}
              onTitleChange={this.handleTitleChange}
              onTextChange={this.handleTextChange}
              onEntrySave={(e) => this.handleEntrySave(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selected: state.entryList.selected };
}

export default connect(mapStateToProps, entryActions)(App);
