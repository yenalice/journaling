import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

const baseState = { entries: [], selected: -1 };

const listReducer = produce((state = baseState, action) => {
  switch (action.type) {
    case actionTypes.ENTRIES_INITIALIZED:
      return {
        entries: action.payload.entries,
        selected: action.payload.selected,
      };
    case actionTypes.ENTRY_CREATED:
      return {
        entries: [...state.entries, action.payload.entry],
        selected: action.payload.selected,
      };

    case actionTypes.ENTRY_MODIFIED:
      const idx = state.entries.findIndex(
        (entry) => entry._id === action.payload.id
      );

      return produce(state, (draftState) => {
        draftState.entries[idx].title = action.payload.title;
        draftState.entries[idx].text = action.payload.text;
        draftState.selected = state.selected;
      });

    case actionTypes.ENTRY_DELETED:
      let newSelected = -1;
      const i = state.entries.findIndex(
        (entry) => entry._id === action.payload.id
      );
      if (state.entries.length - 1 > 0) newSelected = state.entries[i - 1]._id;
      return {
        entries: state.entries.filter(
          (entry) => entry._id != action.payload.id,
          state.entries
        ),
        selected: newSelected,
      };
    case actionTypes.CHANGE_SELECTED:
      return {
        entries: [...state.entries],
        selected: action.payload.id,
      };
    default:
      return state;
  }
});

export default listReducer;
