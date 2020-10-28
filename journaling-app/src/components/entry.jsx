import React, { Component } from "react";

const Entry = ({ handleTitleChange, handleTextChange }) => {
  return (
    <React.Fragment>
      <div id="extras-box">
        <div>
          <input
            type="text"
            placeholder="Entry Title"
            onChange={handleTitleChange}
          ></input>
          <div id="date-box">DATE BOX</div>
        </div>
        <div id="factors">
          <div className="factor-box">WEATHER BOX</div>
          <div className="factor-box">EXERCISE BOX</div>
        </div>
        <div>FORMATTING STUFF</div>
      </div>

      <textarea
        id="text-area"
        type="text"
        placeholder="How was your day?"
        //onChange={handleTextChange}
      ></textarea>
    </React.Fragment>
  );
};

export default Entry;
