import React, { Component } from "react";
import WeatherIcon from "../icons/weather.svg";
import ExerciseIcon from "../icons/exercise.svg";
import Toast from "./toast";

class Entry extends Component {
  render() {
    const {
      title,
      text,
      onTitleChange,
      onTextChange,
      onEntrySave,
    } = this.props;

    return (
      <React.Fragment>
        <div id="extras-box">
          <div>
            <input
              id="title"
              type="text"
              placeholder="Entry Title"
              className="form-control"
              onChange={onTitleChange}
              value={title}
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

        <div className="text-group">
          <textarea
            id="text-area"
            type="text"
            placeholder="How was your day?"
            className="form-control overflow-auto"
            onChange={onTextChange}
            value={text}
          ></textarea>

          <button
            className="btn btn-primary"
            id="save-btn"
            onClick={(e) => onEntrySave(e)}
          >
            SAVE
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Entry;
