import React, { Component } from "react";

class EntryPrev extends Component {
  state = {
    wordPrev: this.props.wordPrev,
    title: this.props.title,
  };

  // TODO: make this part dynamic
  render() {
    return (
      <a
        href="#"
        className="list-group-item list-group-item-action flex-column align-items-start active"
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            {this.state.title === ""
              ? "REPLACE WITH DATE?!!!"
              : this.state.title}
          </h5>
          <small>3 days ago</small>
        </div>
        <p className="mb-1">{this.state.wordPrev}</p>
      </a>
    );
  }
}

export default EntryPrev;
