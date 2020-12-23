import React from "react";
import { Link } from "react-router-dom";
import EntryPrev from "./entryPrev";
import { getTime } from "../timestamp";
import { useSelector } from "react-redux";
import AddEntry from "../icons/addEntry.svg";
import DeleteEntry from "../icons/deleteEntry.svg";

/* style a list-group-item as active or inactive */
const activeStyle = (bool) => {
  let styleStr =
    "list-group-item list-group-item-action flex-column align-items-star";
  return bool == true ? styleStr + " active" : styleStr;
};

var Sidebar = ({ onCreate, onDelete, onSelectEntry }) => {
  const selector = useSelector((state) => state.entryList);
  const selectedIdx = selector.selected;
  const revList = [...selector.entries].reverse();

  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <span>
          <button
            className="btn btn-light btn-outline-secondary"
            onClick={onCreate}
          >
            <img src={AddEntry} alt="Add Entry Icon Unavailable" />
          </button>
          <button
            className="btn btn-light btn-outline-secondary"
            onClick={onDelete}
          >
            <img src={DeleteEntry} alt="Delete Entry Icon Unavailable" />
          </button>
        </span>
        <input
          className="form-inline form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
      </div>

      <div id="preview-container" className="overflow-auto">
        {revList.length === 0 ? null : (
          <div className="list-group">
            {revList.map((entry) => (
              <Link
                to={`/entry/${entry._id}`}
                key={entry._id}
                className={activeStyle(entry._id === selectedIdx)}
                onClick={
                  entry._id != selectedIdx
                    ? () => onSelectEntry(entry._id)
                    : null
                }
              >
                <EntryPrev
                  id={entry._id}
                  title={entry.title}
                  text={entry.text}
                  createTime={getTime(entry._id)}
                ></EntryPrev>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
