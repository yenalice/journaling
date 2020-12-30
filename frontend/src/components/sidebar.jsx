import React from "react";
import { Link } from "react-router-dom";
import { getTime } from "../timestamp";
import { useSelector } from "react-redux";
import AddEntry from "../icons/addEntry.svg";
import DeleteEntry from "../icons/deleteEntry.svg";
import PencilSquare from "../icons/pencilSquare.svg";
import TrashCan from "../icons/trashCan.svg";
import SaveEntry from "../icons/saveEntry.svg";
import VerticalDots from "../icons/threeDotsVertical.svg";
import ReactPaginate from "react-paginate";

/* style a list-group-item as active or inactive */
const activeStyle = (bool) => {
  let styleStr =
    "list-group-item list-group-item-action flex-column align-items-star";
  return bool === true ? styleStr + " active" : styleStr;
};

/* sidebar component */
var Sidebar = ({
  onCreate,
  onDelete,
  deleteMode,
  onCheckboxClick,
  onDeleteMultiple,
  onSelectEntry,
  onSearch,
  onPageClick,
  onEntrySave,
}) => {
  const selector = useSelector((state) => state.entryList);
  const selectedIdx = selector.selected;
  const revList = [...selector.filtered].reverse();

  // TODO: I wanted to send a toast but I can't figure out how to resolve the hooks error :(
  const handleEntrySave = async (event) => {
    const success = await onEntrySave(event);
    success === true ? alert("Entry Saved") : alert("Save Error");
  };

  const displayExtras = () => {
    // TODO: implement sorting
    // TODO: implement filtering by date range
  };

  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <span id="sidebar-btns">
          <button
            className="btn btn-light"
            title="Create a new entry"
            onClick={onCreate}
          >
            <img src={AddEntry} alt="Add Entry Icon Unavailable" />
          </button>
          <button
            className="btn btn-light"
            title="Delete selected entry"
            onClick={onDelete}
          >
            <img src={DeleteEntry} alt="Delete Entry Icon Unavailable" />
          </button>
          {deleteMode === true ? (
            <Link to="/entry/">
              <button
                className="btn btn-light"
                title="Delete multiple entries"
                onClick={() => onDeleteMultiple("trash")}
              >
                <img src={TrashCan} alt="Trash Can Icon Unavailable" />
              </button>
            </Link>
          ) : (
            <Link to="/entry/delete-multiple">
              <button
                className="btn btn-light"
                title="Delete multiple entries"
                onClick={() => onDeleteMultiple("pencil")}
              >
                <img src={PencilSquare} alt="Pencil Square Icon Unavailable" />
              </button>
            </Link>
          )}

          <button
            className="btn btn-light"
            id="save-btn"
            title="Save current entry"
            onClick={(e) => handleEntrySave(e)}
          >
            <img src={SaveEntry} alt="Save Icon Unavailable" />
          </button>

          <button
            className="btn btn-light"
            title="Extra features"
            onClick={displayExtras}
          >
            <img src={VerticalDots} alt="Extras Icon Unavailable" />
          </button>
        </span>
        <input
          id="searchbar"
          className="form-inline form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onSearch(e)}
        />
        <span id="pagination-wrapper">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            pageCount={selector.entries.length / 20}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(n) => onPageClick(n)}
            containerClassName={"pagination flex-wrap"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </span>
      </div>

      <div id="preview-container" className="overflow-auto">
        {revList.length === 0 ? null : (
          <div className="list-group">
            {revList.map((entry) => (
              <Link
                id="prev-link"
                to={`/entry/${entry._id}`}
                key={entry._id}
                className={activeStyle(entry._id === selectedIdx)}
                onClick={
                  entry._id !== selectedIdx
                    ? () => onSelectEntry(entry._id)
                    : null
                }
              >
                <div id="prev-contents">
                  {deleteMode === true ? (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={entry._id}
                      onClick={(e) => onCheckboxClick(e)}
                    />
                  ) : null}
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{entry.title}</h5>
                    <small>{getTime(entry._id)}</small>
                  </div>
                  <p className="mb-1">{entry.text}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
