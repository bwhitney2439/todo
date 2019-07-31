import React from "react";

const ENTER_KEY = 13;

class SearchBar extends React.Component {
  state = { content: "" };

  handleNewTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY && this.state.content !== "") {
      event.preventDefault();

      this.props.addTodoItem(this.state);

      this.setState({ content: "" });
    }
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    return (
      <div className="ui massive icon input">
        <input
          type="text"
          placeholder="what needs to be done?"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyDown={this.handleNewTodoKeyDown}
          autoFocus={true}
        />
        <i className="search icon" />
      </div>
    );
  }
}

export default SearchBar;
