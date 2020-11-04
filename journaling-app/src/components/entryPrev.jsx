import React, { Component } from "react";

class EntryPrev extends Component {
  state = {};

  render() {
    // TODO: create a delete button

    return (
      <React.Fragment>
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{this.props.title}</h5>
          <small>3 days ago</small>
        </div>
        <p className="mb-1">{this.props.wordPrev}</p>
      </React.Fragment>
    );
  }
}

export default EntryPrev;
