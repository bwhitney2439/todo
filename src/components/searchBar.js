import React from "react";

const ENTER_KEY = 13;

class SearchBar extends React.Component {
  state = { content: "", toggleAll: false };

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

  handleToggleAll = () => {
    this.props.toggleAllComplete(this.state.toggleAll);

    this.setState({ toggleAll: !this.state.toggleAll });
  };

  render() {
    return (
      <div className="input-container">
        <i
          className="fas fa-chevron-down fa-w-14 fa-2x"
          onClick={this.handleToggleAll}
        />
        <input
          type="text"
          placeholder="what needs to be done?"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyDown={this.handleNewTodoKeyDown}
          autoFocus={true}
        />
      </div>
    );
  }
}

export default SearchBar;
