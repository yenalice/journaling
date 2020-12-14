import * as actionTypes from "./actionTypes";
import axios from "axios";

/* -------------------- entryList reducer -------------------- */
export const entriesInitialized = () => {
  return async (dispatch) => {
    await axios
      .get(`http://localhost:5000/entry?user=yenalice`)
      .then((res) => {
        const selectedEntry = res.data[res.data.length - 1];
        dispatch({
          type: actionTypes.ENTRIES_INITIALIZED,
          payload: {
            entries: res.data,
            selected: selectedEntry._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log("ID OF CREATED: ", res.data);
        dispatch({
          type: actionTypes.ENTRY_CREATED,
          payload: {
            entry: { _id: res.data._id, title: "", text: "" },
            selected: res.data._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const entryModified = (id, title, text) => {
  return {
    type: actionTypes.ENTRY_MODIFIED,
    payload: {
      id,
      title,
      text,
    },
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
      .catch((err) => {
        console.log(err);
      });
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
