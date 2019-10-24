import React, { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useTodos } from "../Hooks";
import AuthUserContext from "../contexts/AuthUserContext";

const Filter = () => {
  const { activeFilter, dispatchFilter } = useContext(TodoContext);
  const authUser = useContext(AuthUserContext);

  const { todos, clearTodos } = useTodos(authUser);

  const activeTodoCount = todos.reduce((accum, todo) => {
    return todo.completed ? accum : accum + 1;
  }, 0);

  const completedTodoCount = todos.length - activeTodoCount;

  const handleClearTodos = () => {
    clearTodos();
  };

  console.log(authUser);

  return todos.length ? (
    <div className="filter">
      <label>{todos.length} items</label>
      <div className="filter-button-container">
        <button
          className={activeFilter === "All" ? "selected" : ""}
          onClick={() => dispatchFilter({ type: "ALL" })}
        >
          All
        </button>
        <button
          className={activeFilter === "Active" ? "selected" : ""}
          onClick={() => dispatchFilter({ type: "ACTIVE" })}
        >
          Active
        </button>
        <button
          className={activeFilter === "Completed" ? "selected" : ""}
          onClick={() => dispatchFilter({ type: "COMPLETED" })}
        >
          Completed
        </button>
      </div>
      <label
        className={
          completedTodoCount ? "clear-completed" : "hide-clear-completed"
        }
        onClick={handleClearTodos}
      >
        Clear Completed
      </label>
    </div>
  ) : null;
};

export default Filter;
