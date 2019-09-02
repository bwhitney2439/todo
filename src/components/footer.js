import React from "react";
import { connect } from "react-redux";
import { filterTodos, clearTodoItems } from "../actions/index";

function footer({
  dispatch,
  activeFilter,
  completedTodoCount,
  filteredTodosCount,
  totalTodosCount
}) {
  return totalTodosCount ? (
    <div className="filter">
      <label>{filteredTodosCount} items</label>
      <div className="filter-button-container">
        <button
          className={activeFilter === "All" ? "selected" : ""}
          onClick={() => dispatch(filterTodos("All"))}
        >
          All
        </button>
        <button
          className={activeFilter === "Active" ? "selected" : ""}
          onClick={() => dispatch(filterTodos("Active"))}
        >
          Active
        </button>
        <button
          className={activeFilter === "Completed" ? "selected" : ""}
          onClick={() => dispatch(filterTodos("Completed"))}
        >
          Completed
        </button>
      </div>
      <label
        className={completedTodoCount ? "" : "hide-clear-completed"}
        onClick={() => dispatch(clearTodoItems())}
      >
        Clear Completed
      </label>
    </div>
  ) : null;
}

export default connect()(footer);
