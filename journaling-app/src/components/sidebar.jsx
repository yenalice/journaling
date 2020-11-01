import React, { Component } from "react";
import CreateButton from "./createButton";
import EntryPrev from "./entryPrev";

class sidebar extends Component {
  // TODO: change initial state to be whatever is in the database
  state = {
    history: [],
    currId: 0, // id of currently selected entry
  };

  // todo: how should key ordering work?? if an entry is deleted, would the next entry created have its same key,
  // or do we just disregard the # for the deleted key??
  handleCreate = () => {
    const history = [...this.state.history];

    history.push(
      <EntryPrev title={"TESTING TITLE"} wordPrev={"TESTING WORDS"}></EntryPrev>
    );
    this.setState({ history });
  };

  // notify entryPrev that entry has changed
  handleTitleChange = () => {
    console.log("TITLE CHANGE CLICKED YEETT");
  };

  // notify entryPrev that text has changed
  handleTextChange = () => {
    console.log("TEXT CHANGE");
  };

  // TODO: create a delete button

  // TODO: CHANGE TO BE DYNAMIC
  render() {
    return (
      <React.Fragment>
        <CreateButton onCreate={this.handleCreate}></CreateButton>
        <div className="list-group">
          {this.state.history.map((entry, i) => (
            <div key={i}>{entry}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default sidebar;
