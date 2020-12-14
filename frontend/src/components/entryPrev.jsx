import React from "react";

const EntryPrev = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.title}</h5>
        <small>{props.createTime}</small>
      </div>
      <p className="mb-1">{props.text}</p>
    </React.Fragment>
  );
};

export default EntryPrev;
