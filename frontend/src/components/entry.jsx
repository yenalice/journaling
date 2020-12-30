import React from "react";
import WeatherIcon from "../icons/weather.svg";
import ExerciseIcon from "../icons/exercise.svg";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const editorStyle = {
  padding: "0 1em",
};

const Entry = ({ title, text, onTitleChange, onTextChange }) => {
  const toolbar = {
    embedded: {
      embedCallback: (e) => handleEmbed(e),
    },
  };

  /* allows copying & pasting direct link from browser searchbar instead of just embed link */
  const handleEmbed = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("youtube.com/watch?v=")[1];
      return "https://www.youtube.com/embed/" + id;
    }
    return url;
  };

  // TODO: wysiwyg text editor is throwing a warning on click of editor:
  // "Can't call setState on a component that is not yet mounted" -
  // could this be because i'm setting new state to new EditorState object
  // each time text changes & there are issues with timing & the old one unmounting??
  return (
    <React.Fragment>
      <div id="extras-box">
        <div id="factors">
          <button className="factor-box btn btn-light" title="Weather">
            <img src={WeatherIcon} alt="Weather Icon Unavailable" />
          </button>
          <button className="factor-box btn btn-light" title="Exercise">
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
            placeholder="How was your day?"
            editorState={text}
            onEditorStateChange={onTextChange}
            editorStyle={editorStyle}
            toolbar={toolbar}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Entry;
