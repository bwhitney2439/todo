import React from "react";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoItem extends React.Component {
  state = { content: "" };

  componentDidMount() {
    this.setState({ content: this.props.todoItem.content });
  }

  handleEditTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      this.props.editTodoItem(this.state.content, this.props.todoItem);
    } else if (event.keyCode === ESCAPE_KEY) {
      this.props.cancelEdit();
    }
  };

  renderInput = () => {
    const { todoItem, toggleEdit, editing } = this.props;

    if (editing) {
      return (
        <input
          className={todoItem.completed ? "input-completed input-edit" : ""}
          type="text"
          value={this.state.content}
          // onDoubleClick={() => toggleEdit(todoItem)}
          onChange={this.handleChange}
          onKeyDown={this.handleEditTodoKeyDown}
        />
      );
    } else {
      return (
        <input
          className={todoItem.completed ? "input-completed" : ""}
          type="text"
          value={todoItem.content}
          readOnly
          onDoubleClick={() => toggleEdit(todoItem)}
          onKeyDown={this.handleEditTodoKeyDown}
        />
      );
    }
  };

  handleChange = event => {
    this.setState({ content: event.target.value });
  };

  render() {
    const { todoItem, toggleComplete, deleteTodoItem, editing } = this.props;

    return (
      <div className={`input-container ${editing ? "edit" : ""}`}>
        <i
          onClick={() => toggleComplete(todoItem)}
          className={`far ${
            todoItem.completed ? "fa-check-circle" : "fa-circle"
          } fa-w-14 fa-2x`}
        />
        {this.renderInput()}
        <i
          className="fas fa-times fa-w-14 fa-2x destroy"
          onClick={() => {
            deleteTodoItem(todoItem.id);
          }}
        />
      </div>
    );
  }
}

export default TodoItem;
