import React, { Component } from "react";
import WeatherIcon from "../icons/weather.svg";
import ExerciseIcon from "../icons/exercise.svg";

class Entry extends Component {
  state = { title: this.props.title, text: this.props.text };

  changeEntry = (newTitle, newText) => {
    this.setState({ title: newTitle, text: newText });
  };

  render() {
    const { onTitleChange, onTextChange } = this.props;

    return (
      <React.Fragment>
        <div id="extras-box">
          <div>
            <input
              id="title"
              type="text"
              placeholder="Entry Title"
              onChange={onTitleChange}
              value={this.state.title}
              className="form-control"
            ></input>
            <div id="date-box">DATE BOX</div>
          </div>
          <div id="factors">
            <button className="factor-box">
              <img src={WeatherIcon} alt="Weather Icon Unavailable" />
            </button>
            <button className="factor-box">
              <img src={ExerciseIcon} alt="Exercise Icon Unavailable" />
            </button>
          </div>
          <div>FORMATTING STUFF</div>
        </div>

        <textarea
          id="text-area"
          type="text"
          placeholder="How was your day?"
          onChange={onTextChange}
          value={this.state.text}
          className="form-control"
        ></textarea>
      </React.Fragment>
    );
  }
}

export default Entry;
