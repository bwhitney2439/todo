import React from "react";
import { connect } from "react-redux";
import { addTodo, toggleAllComplete } from "./../actions/index";

const ENTER_KEY = 13;

class SearchBar extends React.Component {
  state = { content: "", toggleAll: false };

  handleNewTodoKeyDown = event => {
    const { dispatch } = this.props;
    if (event.keyCode === ENTER_KEY && this.state.content !== "") {
      event.preventDefault();

      // addTodoItem(this.state);

      dispatch(addTodo(this.state.content));

      this.setState({ content: "" });
    }
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  handleToggleAll = () => {
    const { dispatch } = this.props;
    const toggleAll = !this.state.toggleAll;

    dispatch(toggleAllComplete(toggleAll));

    this.setState({ toggleAll });

    // this.props.toggleAllComplete();
  };

  renderSearchIcon() {
    const { length: count } = this.props.todos;
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

export default connect()(SearchBar);
