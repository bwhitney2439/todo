import React, { useState, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import "./addTodo.css";
import { useTodos } from "../Hooks";

const ENTER_KEY = 13;

const AddTodoItem = () => {
  const [content, setContent] = useState("");
  const { authUser } = useContext(TodoContext);

  const { todos, addTodo, toggleAllTodos } = useTodos(authUser);

  const activeTodoCount = todos.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const renderSearchIcon = () => {
    const { length: count } = todos;

    if (!count) {
      return <i className="fas fa-chevron-down fa-w-14 fa-2x hide-input" />;
    } else {
      return (
        <div className="pretty p-icon p-toggle p-plain">
          <input
            className="addtodo-input-checkbox"
            type="checkbox"
            checked={activeTodoCount === 0}
            onChange={handleToggleAllComplete}
          />
          <div className="state p-off">
            <i className="fas fa-chevron-down fa-w-14 fa-2x"></i>
          </div>
          <div className="state p-on">
            <i className="fas fa-chevron-down fa-w-14 fa-2x addtodotoggle" />
          </div>
        </div>
      );
    }
  };

  const handleNewTodoKeyDown = event => {
    if (event.keyCode === ENTER_KEY && content !== "") {
      event.preventDefault();

      addTodo(content);

      setContent("");
    }
  };

  const handleToggleAllComplete = event => {
    toggleAllTodos(event.target.checked);
  };

  const handleChange = event => {
    setContent(event.target.value);
  };

  return (
    <div className="addtodo-input-container">
      {renderSearchIcon()}
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

export default AddTodoItem;
