import React, { Component } from "react";
import CreateButton from "./createButton";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  state = { selectedIdx: 0 };

  // on click, clicked entry preview is highlighted
  handleClick = (id) => {
    this.setState({ selectedIdx: id });
  };

  // on press of create button, new entry is created & newest entry is selected
  handleCreate = (id) => {
    this.props.handleCreate();
    this.setState({ selectedIdx: id });
  };

  render() {
    let styleStr =
      "list-group-item list-group-item-action flex-column align-items-star";
    const revList = [...this.props.history];
    revList.reverse();

    return (
      <div id="sidebar" className="overflow-auto">
        <CreateButton
          onCreate={() => this.handleCreate(this.props.entryId)}
          entryId={this.props.entryId}
        ></CreateButton>
        {revList.length == 0 ? null : (
          <div className="list-group">
            {revList.map((prev) => (
              <Link
                to={`/entry/${prev.props.id}`}
                className={
                  prev.props.id == this.state.selectedIdx
                    ? styleStr + " active"
                    : styleStr
                }
                onClick={() => this.handleClick(prev.props.id)}
                key={prev.props.id}
              >
                {prev}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Sidebar;
