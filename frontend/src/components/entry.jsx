import React from "react";
import WeatherIcon from "../icons/weather.svg";
import ExerciseIcon from "../icons/exercise.svg";

import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";

const Entry = ({ title, text, onTitleChange, onTextChange, onEntrySave }) => {
  // TODO: I wanted to send a toast but I can't figure out how to resolve the hooks error :(
  const handleEntrySave = async (event) => {
    const success = await onEntrySave(event);
    success === true ? alert("Entry Saved") : alert("Save Error");
  };

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
          <button className="factor-box btn btn-light">
            <img src={WeatherIcon} alt="Weather Icon Unavailable" />
          </button>
          <button className="factor-box btn btn-light">
            <img src={ExerciseIcon} alt="Exercise Icon Unavailable" />
          </button>
        </div>
      </div>

      <div className="text-group form-group">
        <RichTextEditorComponent
          cssClass="form-control form-control-lg"
          value={text}
          height="500"
          change={onTextChange}
          style={{ zIndex: 0 }}
        >
          <Inject services={[Link, Image, HtmlEditor, Toolbar, QuickToolbar]} />
        </RichTextEditorComponent>
        <button
          className="btn btn-primary"
          id="save-btn"
          onClick={(e) => handleEntrySave(e)}
        >
          SAVE
        </button>
      </div>
    </React.Fragment>
  );
};

export default Entry;
