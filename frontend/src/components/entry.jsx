import React from "react";
import WeatherIcon from "../icons/weather.svg";
import ExerciseIcon from "../icons/exercise.svg";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const editorStyle = {
  height: "500px",
  padding: "0 1em",
};

const Entry = ({ title, text, onTitleChange, onTextChange, onEntrySave }) => {
  // TODO: I wanted to send a toast but I can't figure out how to resolve the hooks error :(
  const handleEntrySave = async (event) => {
    const success = await onEntrySave(event);
    success === true ? alert("Entry Saved") : alert("Save Error");
  };

  // TODO: wysiwyg text editor is throwing a warning on click of editor:
  // "Can't call setState on a component that is not yet mounted" -
  // could this be because i'm setting new state to new EditorState object
  // each time text changes & there are issues with timing & the old one unmounting??
  return (
    <React.Fragment>
      <div id="extras-box">
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
        <input
          id="title"
          type="text"
          placeholder="Entry Title"
          className="form-control"
          onChange={onTitleChange}
          value={title}
        ></input>
        <div id="editor-wrapper">
          <Editor
            editorClassName="editor"
            placeholder="How was your day?"
            editorState={text}
            onEditorStateChange={onTextChange}
            editorStyle={editorStyle}
          />
        </div>

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
