import React from "react";
import { connect } from "react-redux";
import { addTodo, testAddTodo, toggleAllComplete } from "../actions/index";

const ENTER_KEY = 13;

class AddTodo extends React.Component {
  state = { content: "" };

  handleNewTodoKeyDown = event => {
    const { addTodo } = this.props;
    const { content } = this.state;
    if (event.keyCode === ENTER_KEY && content !== "") {
      event.preventDefault();

      addTodo(content);

      this.setState({ content: "" });
    }
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  renderSearchIcon() {
    const { length: count } = this.props.todos;
    const { activeTodoCount, toggleAllComplete } = this.props;

    if (!count) {
      return <i className="fas fa-chevron-down fa-w-14 fa-2x hide-input" />;
    } else {
      return (
        <div className="pretty p-icon p-toggle p-plain">
          <input
            className="addtodo-input-checkbox"
            type="checkbox"
            checked={activeTodoCount === 0}
            onChange={event => toggleAllComplete(event.target.checked)}
          />
          <div className="state p-off">
            <i className="fas fa-chevron-down fa-w-14 fa-2x"></i>
          </div>
          <div className="state p-on">
            <i className="fas fa-chevron-down fa-w-14 fa-2x addtodotoggle" />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="addtodo-input-container">
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

const mapDispatchToProps = dispatch => {
  return {
    toggleAllComplete: toggleAll => dispatch(toggleAllComplete(toggleAll)),
    testAddTodo: content => dispatch(testAddTodo(content)),
    addTodo: content => dispatch(addTodo(content))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddTodo);
