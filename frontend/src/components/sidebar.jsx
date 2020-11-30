import React, { Component } from "react";
import CreateButton from "./createButton";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  state = { selectedIdx: 0 };

  // on click, clicked entry preview is highlighted
  handleSelectEntry = (id) => {
    this.props.onSelectEntry(id);
    this.setState({ selectedIdx: id });
  };

  // on press of create button, new entry is created & newest entry is selected
  handleCreate = (id) => {
    this.props.onCreate();
    this.setState({ selectedIdx: id });
  };

  render() {
    let styleStr =
      "list-group-item list-group-item-action flex-column align-items-star";
    const revList = [...this.props.entryHistory];
    revList.reverse();

    return (
      <div id="sidebar" className="overflow-auto">
        <CreateButton
          onCreate={() => this.handleCreate(this.props.id)}
        ></CreateButton>
        {revList.length === 0 ? null : (
          <div className="list-group">
            {revList.map((entryPrev) => (
              <Link
                to={`/entry/${entryPrev.props.id}`}
                className={
                  entryPrev.props.id === this.state.selectedIdx
                    ? styleStr + " active"
                    : styleStr
                }
                onClick={() => this.handleSelectEntry(entryPrev.props.id)}
                key={entryPrev.props.id}
              >
                {entryPrev}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
