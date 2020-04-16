import React, { useState } from "react";
import "./AddTodo.css";
import { useAppState } from "../contexts";
import ToggleAllButton from "./ToggleAllButton";

const ENTER_KEY = 13;

const AddTodo = () => {
  const [content, setContent] = useState("");
  const { todos, addTodo, toggleAllTodos, authUser } = useAppState();

  const { length: count } = todos;

  const activeTodoCount = todos.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const handleNewTodoKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY && content !== "") {
      event.preventDefault();

      addTodo(content, authUser);

      setContent("");
    }
  };

  const handleToggleAllComplete = (checked) => {
    toggleAllTodos(checked);
  };

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="addtodo-input-container">
      <ToggleAllButton
        toggleAllComplete={(checked) => handleToggleAllComplete(checked)}
        check={activeTodoCount === 0}
        count={count}
      />
      <input
        type="text"
        placeholder="what needs to be done?"
        value={content}
        onChange={handleChange}
        onKeyDown={handleNewTodoKeyDown}
        autoFocus={true}
      />
    </div>
  );
};

export default AddTodo;
