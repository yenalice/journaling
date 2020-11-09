import React, { Component } from "react";
import { Link } from "react-router-dom";

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

    return revList.length == 0 ? null : (
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
    );
  }
}

export default SideBar;
