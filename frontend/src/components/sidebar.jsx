import React from "react";
import { Link } from "react-router-dom";
import { getTime } from "../timestamp";
import { useSelector } from "react-redux";
import AddEntry from "../icons/addEntry.svg";
import DeleteEntry from "../icons/deleteEntry.svg";
import PencilSquare from "../icons/pencilSquare.svg";
import TrashCan from "../icons/trashCan.svg";
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
}) => {
  const selector = useSelector((state) => state.entryList);
  const selectedIdx = selector.selected;
  const revList = [...selector.filtered].reverse();

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
          {deleteMode === true ? (
            <Link to="/entry/">
              <button
                className="btn btn-light btn-outline-secondary"
                onClick={() => onDeleteMultiple("trash")}
              >
                <img src={TrashCan} alt="Trash Can Icon Unavailable" />
              </button>
            </Link>
          ) : (
            <Link to="/entry/delete-multiple">
              <button
                className="btn btn-light btn-outline-secondary"
                onClick={() => onDeleteMultiple("pencil")}
              >
                <img src={PencilSquare} alt="Pencil Square Icon Unavailable" />
              </button>
            </Link>
          )}
        </span>
        <input
          className="form-inline form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => onSearch(e)}
        />
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
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
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
                <div id="prev-ctn">
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
