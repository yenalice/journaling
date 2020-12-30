import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Entry from "./components/entry";
import NavBar from "./components/navBar";
import Sidebar from "./components/sidebar";
import * as entryActions from "./actions/entryActions";
import DeleteModal from "./components/deleteModal";
import { EditorState, ContentState } from "draft-js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: EditorState.createEmpty(),
      modalIsOpen: false,
      deleteMode: false,
      selectedDelete: [],
    };
  }

  /* load sidebar of entry previews and the entry display */
  // TODO: change hardcoded "yenalice" to match session/current user
  componentDidMount = async () => {
    await this.props.entriesInitialized();
    this.setEntryDisplay(this.props.selected);
  };

  /* store changes to title box */
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  /* store changes to text box */
  handleTextChange = async (editorState) => {
    this.setState({ text: editorState });
  };

  /* create new entry */
  handleCreate = async () => {
    await this.props.entryCreated();
    this.setEntryDisplay(this.props.selected);
  };

  /* delete current selected entry */
  handleDelete = () => {
    this.setState({ modalIsOpen: true });
  };

  /* deletes current entry if "yes" was selected on modal */
  handleModalClick = async (res) => {
    if (res === "yes") {
      await this.props.entryDeleted(this.props.selected);
      this.setEntryDisplay(this.props.selected);
    }
    this.setState({ modalIsOpen: false });
  };

  /* delete multiple entries */
  handleDeleteMultiple = (type) => {
    if (type === "trash")
      this.props.multipleEntriesDeleted(this.state.selectedDelete);
    this.setState({ deleteMode: !this.state.deleteMode });
  };

  /* keep track of checkboxes clicked - add to list if checkbox is not already set & delete from list otherwise */
  handleCheckboxClick = (event) => {
    event.stopPropagation();
    const currId = event.target.id;
    if (!this.state.selectedDelete.includes(currId)) {
      this.setState({
        selectedDelete: [...this.state.selectedDelete, currId],
      });
    } else {
      this.setState({
        selectedDelete: this.state.selectedDelete.filter((id) => id !== currId),
      });
    }
  };

  /* highlight entryPrev selected & load info of selected entry into display */
  handleSelect = (id) => {
    this.props.changeSelected(id);
    this.setEntryDisplay(id);
  };

  /* save entry changes to database */
  handleEntrySave = async (event) => {
    event.stopPropagation();

    const id = this.props.selected;
    const title = this.state.title;
    const text = this.state.text.getCurrentContent().getPlainText("\u0001");

    return this.props.entryModified(id, title, text);
  };

  /* filter out sidebar entry previews with searchbar */
  handleSearch = async (event) => {
    const val = event.target.value;
    await this.props.entriesFiltered(val);
    await this.props.changeSelected(this.props.selected);
    if (this.props.selected === -1) {
      this.setState({ title: "", text: "" });
    } else {
      this.setEntryDisplay(this.props.selected);
    }
  };

  handlePageClick = (pageNumber) => {
    this.props.changePageNumber(pageNumber.selected);
  };

  /* set entry title & text using id */
  setEntryDisplay = (id) => {
    axios
      .get(`http://localhost:5000/entry/${id}?user=yenalice`)
      .then((res) => {
        this.setState({
          title: res.data.title,
          text: EditorState.createWithContent(
            ContentState.createFromText(res.data.text)
          ),
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <header id="header">
          <NavBar />
        </header>
        <div id="main-container">
          <DeleteModal
            isOpen={this.state.modalIsOpen}
            onModalClick={(res) => this.handleModalClick(res)}
          />
          <Sidebar
            entryHistory={this.props.entryList}
            onCreate={this.handleCreate}
            onDelete={this.handleDelete}
            deleteMode={this.state.deleteMode}
            onCheckboxClick={(e) => this.handleCheckboxClick(e)}
            onDeleteMultiple={this.handleDeleteMultiple}
            onSelectEntry={(id) => this.handleSelect(id)}
            onSearch={(e) => this.handleSearch(e)}
            onPageClick={(n) => this.handlePageClick(n)}
            onEntrySave={(e) => this.handleEntrySave(e)}
          />
          <div id="entry">
            <Entry
              title={this.state.title}
              text={this.state.text}
              onTitleChange={this.handleTitleChange}
              onTextChange={this.handleTextChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selected: state.entryList.selected };
}

export default connect(mapStateToProps, entryActions)(App);
