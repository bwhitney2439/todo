import React from "react";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoItem extends React.Component {
  state = { value: "", content: "" };

  componentDidMount() {
    console.log("componentdidmount");
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

  // handleEditTodoFocus = event => {
  //   // event.target.selectionStart = event.target.selectionEnd =
  //   //   event.target.value.length;
  //   let range = event.target.createTextRange();
  //   range.collapse(false);
  //   range.select();
  // };

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
        // <input
        //   className={todoItem.completed ? "input-completed" : ""}
        //   type="text"
        //   value={todoItem.content}
        //   readOnly
        //   onDoubleClick={() => this.handleEditToDo(todoItem)}
        //   // onKeyDown={this.handleEditTodoKeyDown}
        //   // onFocus={this.handleEditTodofocus}
        // />
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
