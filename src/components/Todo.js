import React, { useState, useEffect } from "react";
import { FaRegCircle, FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { useAppState } from "../contexts";
import "./Todo.css";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const Todo = ({ todo }) => {
  const { toggleTodo, editTodo, deleteTodo } = useAppState();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(todo.content);
  }, [todo.content]);

  const handleEditTodoKeyDown = (event) => {
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

  const handleToggle = (todo) => {
    toggleTodo(todo);
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className={`input-container ${editing ? "edit" : ""}`}>
      {todo.completed ? (
        <FaRegCheckCircle
          className="fa-icon"
          onClick={() => handleToggle(todo)}
          size="30px"
        />
      ) : (
        <FaRegCircle
          className="fa-icon"
          onClick={() => handleToggle(todo)}
          size="30px"
        />
      )}
      {editing ? (
        <input
          className={todo.completed ? "input-completed input-edit" : ""}
          type="text"
          value={content}
          onBlur={handleEditTodoUnfocus}
          onChange={handleChange}
          onKeyDown={handleEditTodoKeyDown}
          autoFocus
        />
      ) : (
        <label
          className={todo.completed ? "input-completed" : ""}
          onDoubleClick={handleToggleEdit}
        >
          {content}
        </label>
      )}
      <FaTimes
        className="fa-icon destroy"
        onClick={() => handleDeleteTodo(todo.id)}
        size="30px"
      />
    </div>
  );
};

export default Todo;
