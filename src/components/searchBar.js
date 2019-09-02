import React from "react";
import { connect } from "react-redux";
import { addTodo, toggleAllComplete } from "./../actions/index";

const ENTER_KEY = 13;

class SearchBar extends React.Component {
  state = { content: "" };

  handleNewTodoKeyDown = event => {
    const { dispatch } = this.props;
    if (event.keyCode === ENTER_KEY && this.state.content !== "") {
      event.preventDefault();

      dispatch(addTodo(this.state.content));

      this.setState({ content: "" });
    }
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  renderSearchIcon() {
    const { length: count } = this.props.todos;
    const { activeTodoCount, dispatch } = this.props;

    if (!count) {
      return (
        <i className="fas fa-chevron-down fa-w-14 fa-2x searchIconInvis hide-input" />
      );
    } else {
      return (
        <div className="pretty p-icon p-toggle p-plain">
          <input
            type="checkbox"
            checked={activeTodoCount === 0}
            onChange={event =>
              dispatch(toggleAllComplete(event.target.checked))
            }
          />
          <div className="state p-off">
            <i className="fas fa-chevron-down fa-w-14 fa-2x"></i>
          </div>
          <div className="state p-on">
            <i className="fas fa-chevron-down fa-w-14 fa-2x searchIconToggle" />
          </div>
        </div>
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
