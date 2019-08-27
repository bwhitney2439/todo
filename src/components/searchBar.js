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

  handleToggleAll = () => {
    this.props.toggleAllComplete();
  };

  renderSearchIcon() {
    const { length: count } = this.props.todoItems;
    const { activeTodoCount } = this.props;

    if (!count) {
      return (
        <i className="fas fa-chevron-down fa-w-14 fa-2x searchIconInvis" />
      );
    } else {
      return (
        <i
          className={
            activeTodoCount
              ? "fas fa-chevron-down fa-w-14 fa-2x"
              : "fas fa-chevron-down fa-w-14 fa-2x searchIconToggle"
          }
          onClick={this.handleToggleAll}
        />
      );
    }
  }

  render() {
    console.log(this.props.toggleAll);
    return (
      <div className="input-container">
        {this.renderSearchIcon()}
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
