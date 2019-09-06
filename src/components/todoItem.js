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
    const { editTodo, todoItem } = this.props;
    const { content } = this.state;
    if (event.keyCode === ENTER_KEY && content !== "") {
      editTodo(content, todoItem.id);
      this.setState({ editing: false });
    } else if (event.keyCode === ESCAPE_KEY) {
      this.setState({ content: todoItem.content, editing: false });
    }
  };

  handleEditTodoUnfocus = () => {
    const { todoItem } = this.props;
    this.setState({ content: todoItem.content, editing: false });
  };

  handleToggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing });
  };

  renderInput = () => {
    const { todoItem } = this.props;
    const { editing, content } = this.state;

    if (editing) {
      return (
        <input
          className={todoItem.completed ? "input-completed input-edit" : ""}
          type="text"
          value={content}
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
    const { todoItem, toggleTodo, deleteTodo } = this.props;
    const { editing } = this.state;

    return (
      <div className={`input-container ${editing ? "edit" : ""}`}>
        <i
          onClick={() => toggleTodo(todoItem)}
          className={`far ${
            todoItem.completed ? "fa-check-circle" : "fa-circle"
          } fa-w-14 fa-2x`}
        />
        {this.renderInput()}
        <i
          className="fas fa-times fa-w-14 fa-2x destroy"
          onClick={() => deleteTodo(todoItem)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: todoItem => dispatch(toggleTodo(todoItem)),
    deleteTodo: todoItem => dispatch(deleteTodo(todoItem)),
    editTodo: (content, id) => dispatch(editTodo(content, id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
