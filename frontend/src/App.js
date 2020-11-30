import React, { Component } from "react";
import Entry from "./components/entry";
import EntryPrev from "./components/entryPrev";
import NavBar from "./components/navBar";
import Sidebar from "./components/sidebar";
import axios from "axios";

class App extends Component {
  state = {
    entryHistory: [],
    currTitle: "",
    currText: "",
  };

  constructor(props) {
    super(props);
    this.entryElement = React.createRef();
  }

  /* Format date in form mm/dd/year */
  formatDate = (t) => {
    return (
      (t.getMonth() + 1).toString() +
      "/" +
      t.getDate().toString() +
      "/" +
      t.getFullYear().toString().substring(0, 2)
    );
  };

  /* Format hours in format hour: minute */
  formatHour = (t) => {
    const mins = t.getMinutes();
    const minutes = mins >= 10 ? mins.toString() : "0" + mins.toString();
    return t.getHours().toString() + ":" + minutes;
  };

  /* if 1 day or greater, display # days, else display # hours */
  getTime = (t) => {
    const timestamp = t.toString().substring(0, 8);
    const date = new Date(parseInt(timestamp, 16) * 1000);
    const difference = Date.now() - date;
    return difference < 86400000
      ? this.formatHour(date)
      : this.formatDate(date);
  };

  /* Initially load entry previews on sidebar with database entries */
  // TODO: change hardcoded "yenalice" to match session/current user
  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/entry?user=yenalice`)
      .then((res) => {
        this.setState({
          entryHistory: res.data.map((entry) => (
            <EntryPrev
              id={entry._id}
              title={entry.title}
              text={entry.text}
              createTime={this.getTime(entry._id)}
            ></EntryPrev>
          )),
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  /* Create new entry on press of create button */
  // TODO: change username to fit session
  handleCreate = async () => {
    let entryHistory = [...this.state.entryHistory];
    let currId = -1;

    // add entry to database
    const entry = {
      username: "yenalice",
      title: this.state.currTitle,
      text: this.state.currText,
    };

    await axios
      .post("http://localhost:5000/entry?user=yenalice", entry)
      .then((res) => {
        currId = res.data.id;
      })
      .catch((err) => {
        console.log("Error: " + err);
      });

    // create new entry preview
    entryHistory.push(
      <EntryPrev
        id={currId}
        title={this.state.currTitle}
        text={this.state.currText}
      ></EntryPrev>
    );

    this.setState({ entryHistory });
  };

  /* load entry upon selecting an entry preview on the side */
  handleSelectEntry = (id) => {
    axios
      .get(`http://localhost:5000/entry/${id}?user=yenalice`)
      .then((res) => {
        this.entryElement.current.changeEntry(res.data.title, res.data.text);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  // notify entryPrev that entry has changed
  // TODO: change in database
  handleTitleChange = (event) => {
    this.setState({ currTitle: event.target.value });
  };

  // notify entryPrev that text has changed
  // TODO: change in database
  handleTextChange = (event) => {
    this.setState({ currText: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <header id="header">
          <NavBar />
        </header>
        <div id="main-container">
          <Sidebar
            entryHistory={this.state.entryHistory}
            onCreate={this.handleCreate}
            onSelectEntry={this.handleSelectEntry}
          />
          <div id="entry">
            <Entry
              ref={this.entryElement}
              onTitleChange={this.handleTitleChange}
              onTextChange={this.handleTextChange}
              title={this.state.currTitle}
              text={this.state.Text}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
