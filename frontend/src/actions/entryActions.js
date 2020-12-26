import * as actionTypes from "./actionTypes";
import axios from "axios";

/* -------------------- entryList reducer -------------------- */
export const entriesInitialized = () => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:5000/entry?user=yenalice`)
      .then((res) => {
        dispatch({
          type: actionTypes.ENTRIES_INITIALIZED,
          payload: {
            entries: res.data,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const entryCreated = () => {
  return async (dispatch) => {
    const entry = {
      username: "yenalice",
      title: "",
      text: "",
    };

    return await axios
      .post(`http://localhost:5000/entry?user=yenalice`, entry)
      .then((res) => {
        dispatch({
          type: actionTypes.ENTRY_CREATED,
          payload: {
            entry: { _id: res.data._id, title: "", text: "" },
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const entryModified = (id, title, text) => {
  return (dispatch) => {
    const data = { title, text };
    let success = axios
      .post(`http://localhost:5000/entry/${id}?user=yenalice`, data)
      .then((res) => {
        dispatch({
          type: actionTypes.ENTRY_MODIFIED,
          payload: {
            id,
            title,
            text,
          },
        });
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return success;
  };
};

export const entryDeleted = (id) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:5000/entry/${id}?user=yenalice`)
      .then((res) => {
        dispatch({
          type: actionTypes.ENTRY_DELETED,
          payload: {
            id,
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const multipleEntriesDeleted = (toDelete) => {
  return (dispatch) => {
    console.log("DELETE LIST");
    return axios
      .delete(
        `http://localhost:5000/entry/delete-multiple/${toDelete}?user=yenalice`
      )
      .then((res) =>
        dispatch({
          type: actionTypes.MULTIPLE_DELETED,
          payload: {
            deleteList: toDelete,
          },
        })
      )
      .catch((err) => console.log(err));
  };
};

export const changeSelected = (id) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_SELECTED,
      payload: { id },
    });
  };
};

export const entriesFiltered = (str) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ENTRIES_FILTERED,
      payload: {
        filterStr: str,
      },
    });
  };
};

export const changePageNumber = (pageNumber) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_PAGE_NUMBER,
      payload: { pageNumber },
    });
  };
};
