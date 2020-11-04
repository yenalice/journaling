import React, { Component } from "react";

class SideBar extends Component {
  state = { selectedIdx: 0 };

  handleClick = (id) => {
    this.setState({ selectedIdx: id });
  };

  render() {
    let styleStr =
      "list-group-item list-group-item-action flex-column align-items-star";
    const revList = [...this.props.history];
    revList.reverse();

    // TODO: change href
    return revList.length == 0 ? null : (
      <div className="list-group">
        {revList.map((entry, i) => (
          <a
            href="#"
            className={
              i == this.state.selectedIdx ? styleStr + " active" : styleStr
            }
            onClick={() => this.handleClick(i)}
            key={i}
          >
            {entry}
          </a>
        ))}
      </div>
    );
  }
}

export default SideBar;
