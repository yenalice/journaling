import * as actionTypes from "../actions/actionTypes";
import produce from "immer";

/*
 * entries = global entries list
 * filtered = up to n entries matching searchbar search (just first n entries if nothing is searched)
 * filterStr = global search string; changes as searchbar input changes
 * pageNumber = selected page containing n entries to be displayed
 * selected = id of entry preview item currently selected in searchbar
 */
const n = 20;
const baseState = {
  entries: [],
  filtered: [],
  filterStr: "",
  pageNumber: 0,
  perPage: n,
  selected: -1,
};

const listReducer = produce((state = baseState, action) => {
  switch (action.type) {
    /* ---------- initialization ---------- */
    case actionTypes.ENTRIES_INITIALIZED:
      const initialFiltered = getPage(action.payload.entries, state.pageNumber);
      return {
        entries: action.payload.entries,
        filtered: initialFiltered,
        filterStr: state.filterStr,
        selected: selectEntry(initialFiltered),
        pageNumber: state.pageNumber,
      };
    /* ---------- creating entry ---------- */
    case actionTypes.ENTRY_CREATED:
      const createFiltered = getPage(
        filterByStr([...state.entries, action.payload.entry], state.filterStr),
        state.pageNumber
      );
      return {
        entries: [...state.entries, action.payload.entry],
        filtered: createFiltered,
        filterStr: state.filterStr,
        selected: selectEntry(createFiltered),
        pageNumber: state.pageNumber,
      };
    /* ---------- modifying entry ---------- */
    case actionTypes.ENTRY_MODIFIED:
      const idx = state.entries.findIndex(
        (entry) => entry._id === action.payload.id
      );

      return produce(state, (draftState) => {
        draftState.entries[idx].title = action.payload.title;
        draftState.entries[idx].text = action.payload.text;
        draftState.filtered = getPage(
          filterByStr(draftState.entries, state.filterStr),
          state.pageNumber
        );
        draftState.filterStr = state.filterStr;
        draftState.selected = state.selected;
        draftState.pageNumber = state.pageNumber;
      });
    /* ---------- deleting entry ---------- */
    case actionTypes.ENTRY_DELETED:
      const deletedEntries = deleteEntry(state.entries, action.payload.id);
      const deletedFiltered = getPage(
        filterByStr(deletedEntries, state.filterStr),
        state.pageNumber
      );
      return {
        entries: deletedEntries,
        filtered: deletedFiltered,
        filterStr: state.filterStr,
        selected: selectEntry(deletedFiltered),
        pageNumber: state.pageNumber,
      };
    /* ---------- deleting multiple entries ---------- */
    case actionTypes.MULTIPLE_DELETED:
      const multDelEntries = deleteMultiple(
        state.entries,
        action.payload.deleteList
      );
      const multDelFiltered = getPage(
        filterByStr(multDelEntries, state.filterStr),
        state.pageNumber
      );
      return {
        entries: multDelEntries,
        filtered: multDelFiltered,
        filterStr: state.filterStr,
        selected: selectEntry(multDelFiltered),
        pageNumber: state.pageNumber,
      };
    /* ---------- changing selected entry ---------- */
    case actionTypes.CHANGE_SELECTED:
      return {
        entries: state.entries,
        filtered: state.filtered,
        filterStr: state.filterStr,
        selected: action.payload.id,
        pageNumber: state.pageNumber,
      };
    /* ---------- changing filter string used ---------- */
    case actionTypes.ENTRIES_FILTERED:
      const newFiltered = getPage(
        filterByStr(state.entries, action.payload.filterStr),
        state.pageNumber
      );
      return {
        entries: state.entries,
        filtered: newFiltered,
        filterStr: action.payload.filterStr,
        selected: selectEntry(newFiltered),
        pageNumber: state.pageNumber,
      };
    /* ---------- changing page number displayed in sidebar ---------- */
    case actionTypes.CHANGE_PAGE_NUMBER:
      const newPageFiltered = getPage(
        filterByStr(state.entries, state.filterStr),
        action.payload.pageNumber
      );

      return {
        entries: state.entries,
        filtered: newPageFiltered,
        filterStr: state.filterStr,
        selected: selectEntry(newPageFiltered),
        pageNumber: action.payload.pageNumber,
      };
    /* ---------- default ---------- */
    default:
      return state;
  }
});

// return list of entries that does not contain id
const deleteEntry = (entries, id) => {
  return entries.filter((entry) => entry._id !== id);
};

// return list of entries that are not in idList
const deleteMultiple = (entries, idList) => {
  return entries.filter((entry) => !idList.includes(entry._id));
};

// filter for first 20 entries with title or text that has the substring str
const filterByStr = (list, str) => {
  str = str.toLowerCase();
  return list.filter(
    (entry) =>
      entry.title.toLowerCase().includes(str) ||
      entry.text.toLowerCase().includes(str)
  );
};

// take specific page number
const getPage = (list, pageNumber) => {
  return list.slice(pageNumber * 20, (pageNumber + 1) * 20);
};

// get newest selected entry
const selectEntry = (list) => {
  return list.length === 0 ? -1 : list[list.length - 1]._id;
};

export default listReducer;
