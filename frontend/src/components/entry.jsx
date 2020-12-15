import React, { Component } from "react";
import WeatherIcon from "../icons/weather.svg";
import ExerciseIcon from "../icons/exercise.svg";
import Toast from "./toast";

import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  ToolbarSettingsModel,
  IFormatter,
} from "@syncfusion/ej2-react-richtexteditor";

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
        </div>

        <div className="text-group">
          <RichTextEditorComponent
            id="rich-text"
            value={text}
            height="500"
            change={onTextChange}
          >
            <Inject
              services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]}
            />
          </RichTextEditorComponent>
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
