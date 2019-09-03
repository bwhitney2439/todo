import React from "react";
import { connect } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "./../actions/index";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoItem extends React.Component {
  state = { content: "", editing: false };

  componentDidMount() {
    this.setState({ content: this.props.todoItem.content });
  }

  handleEditTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      this.props.dispatch(editTodo(this.state.content, this.props.todoItem.id));
      this.setState({ editing: false });
    } else if (event.keyCode === ESCAPE_KEY) {
      this.setState({ content: this.props.todoItem.content, editing: false });
    }
  };

  handleEditTodoUnfocus = () => {
    this.setState({ content: this.props.todoItem.content, editing: false });
  };

  handleToggleEdit = () => {
    const editing = !this.state.editing;
    console.log(editing);
    this.setState({ editing });
  };

  renderInput = () => {
    const { todoItem } = this.props;

    if (this.state.editing) {
      return (
        <input
          className={todoItem.completed ? "input-completed input-edit" : ""}
          type="text"
          value={this.state.content}
          onBlur={this.handleEditTodoUnfocus}
          onChange={this.handleChange}
          onKeyDown={this.handleEditTodoKeyDown}
          onFocus={this.handleEditTodofocus}
          autoFocus
        />
      );
    } else {
      return (
        <label
          className={todoItem.completed ? "input-completed" : ""}
          onDoubleClick={this.handleToggleEdit}
        >
          {todoItem.content}
        </label>
      );
    }
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    const { todoItem, dispatch } = this.props;

    return (
      <div className={`input-container ${this.state.editing ? "edit" : ""}`}>
        <i
          onClick={() => dispatch(toggleTodo(todoItem.id))}
          className={`far ${
            todoItem.completed ? "fa-check-circle" : "fa-circle"
          } fa-w-14 fa-2x`}
        />
        {this.renderInput()}
        <i
          className="fas fa-times fa-w-14 fa-2x destroy"
          onClick={() => dispatch(deleteTodo(todoItem.id))}
        />
      </div>
    );
  }
}

export default connect()(TodoItem);
