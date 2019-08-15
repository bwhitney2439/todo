import React from "react";

class TodoItem extends React.Component {
  state = { content: "" };

  renderInput = () => {
    const { todoItem, toggleEdit } = this.props;

    if (todoItem.edit) {
      return (
        <input
          className={todoItem.completed ? "input-completed" : ""}
          type="text"
          value={this.state.content}
          onDoubleClick={() => toggleEdit(todoItem)}
          onChange={this.handleChange}
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
        />
      );
    }
  };

  handleChange = event => {};

  render() {
    const { todoItem, toggleComplete, deleteTodoItem } = this.props;
    return (
      <div className="input-container">
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
