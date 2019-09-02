import React from "react";
import { connect } from "react-redux";
import { toggleTodo, deleteTodo } from "./../actions/index";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoItem extends React.Component {
  state = { value: "", content: "" };

  componentDidMount() {
    this.setState({ content: this.props.todoItem.content });
  }

  handleEditTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      this.props.editTodoItem(this.state.content, this.props.todoItem);
    } else if (event.keyCode === ESCAPE_KEY) {
      this.setState({ content: this.props.todoItem.content });
      this.props.cancelEdit();
    }
  };

  handleEditTodoUnfocus = () => {
    this.setState({ content: this.props.todoItem.content });
    this.props.cancelEdit();
  };

  handleEditToDo = todoItem => {
    this.props.toggleEdit(todoItem);
  };

  renderInput = () => {
    const { todoItem, editing } = this.props;

    if (editing) {
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
          onDoubleClick={() => this.handleEditToDo(todoItem)}
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
    const { todoItem, editing, dispatch } = this.props;

    return (
      <div className={`input-container ${editing ? "edit" : ""}`}>
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
