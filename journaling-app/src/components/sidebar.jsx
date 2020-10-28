import React, { Component } from "react";
import CreateButton from "./createButton";
import EntryPrev from "./entryPrev";

class sidebar extends Component {
  // TODO: change initial state to be whatever is in the database
  state = {
    history: [],
    count: 0,
  };

  // todo: how should key ordering work?? if an entry is deleted, would the next entry created have its same key,
  // or do we just disregard the # for the deleted key??
  handleCreate = () => {
    const history = [...this.state.history];
    const count = this.state.count + 1;

    history.push(
      <EntryPrev title={"TESTING TITLE"} wordPrev={"TESTING WORDS"}></EntryPrev>
    );
    this.setState({ count });
    this.setState({ history });
  };

  // notify entryPrev that entry has changed
  handleTitleChange = (entryId) => {
    console.log("TITLE CHANGE");
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
