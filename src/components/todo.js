import React, { useContext, useState, useEffect } from "react";

import { TodoContext } from "./../contexts/TodoContext";
import { useTodos } from "../Hooks";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const Todo = ({ todo }) => {
  const { authUser } = useContext(TodoContext);
  const { toggleTodo, editTodo, deleteTodo } = useTodos(authUser);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(todo.content);
  }, [todo.content]);

  const handleEditTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY && content !== "") {
      editTodo(todo.id, content);
      setEditing(false);
    } else if (event.keyCode === ESCAPE_KEY) {
      setContent(todo.content);
      setEditing(false);
    }
  };

  const handleEditTodoUnfocus = () => {
    setContent(todo.content);
    setEditing(false);
  };

  const handleToggleEdit = () => {
    setEditing(!editing);
  };

  const handleToggle = todo => {
    toggleTodo(todo);
  };

  const handleDeleteTodo = id => {
    deleteTodo(id);
  };

  const renderInput = () => {
    if (editing) {
      return (
        <input
          className={todo.completed ? "input-completed input-edit" : ""}
          type="text"
          value={content}
          onBlur={handleEditTodoUnfocus}
          onChange={handleChange}
          onKeyDown={handleEditTodoKeyDown}
          autoFocus
        />
      );
    } else {
      return (
        <label
          className={todo.completed ? "input-completed" : ""}
          onDoubleClick={handleToggleEdit}
        >
          {content}
        </label>
      );
    }
  };

  const handleChange = event => {
    setContent(event.target.value);
  };

  return (
    <div className={`input-container ${editing ? "edit" : ""}`}>
      <i
        onClick={() => handleToggle(todo)}
        className={`far ${
          todo.completed ? "fa-check-circle" : "fa-circle"
        } fa-w-14 fa-2x`}
      />
      {renderInput()}
      <i
        className="fas fa-times fa-w-14 fa-2x destroy"
        onClick={() => handleDeleteTodo(todo.id)}
      />
    </div>
  );
};

export default Todo;
