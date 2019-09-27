import React, { useContext, useState, useEffect } from "react";

import { TodoContext } from "./../contexts/TodoContext";

const Todo = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(todo.content);
  }, []);

  handleEditTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY && content !== "") {
      dispatch({ type: "EDIT_TODO", id: todo.id });
      setEditing(false);
    } else if (event.keyCode === ESCAPE_KEY) {
      setContent(todo.content);
      setEditing(false);
    }
  };

  handleEditTodoUnfocus = () => {
    setContent(todo.content);
    setEditing(false);
  };

  handleToggleEdit = () => {
    setEditing(!editing);
  };

  renderInput = () => {
    if (editing) {
      return (
        <input
          className={todo.completed ? "input-completed input-edit" : ""}
          type="text"
          value={content}
          onBlur={() => handleEditTodoUnfocus()}
          onChange={() => handleChange()}
          onKeyDown={() => handleEditTodoKeyDown()}
          onFocus={() => handleEditTodofocus()}
          autoFocus
        />
      );
    } else {
      return (
        <label
          className={todo.completed ? "input-completed" : ""}
          onDoubleClick={() => handleToggleEdit()}
        >
          {todo.content}
        </label>
      );
    }
  };

  handleChange = event => {
    setContent(event.target.value);
  };

  return (
    <div className={`input-container ${editing ? "edit" : ""}`}>
      <i
        onClick={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
        className={`far ${
          todo.completed ? "fa-check-circle" : "fa-circle"
        } fa-w-14 fa-2x`}
      />
      {renderInput()}
      <i
        className="fas fa-times fa-w-14 fa-2x destroy"
        onClick={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}
      />
    </div>
  );
};

export default Todo;
