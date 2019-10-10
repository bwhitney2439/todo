import React, { createContext, useReducer } from "react";

import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";
import { useTodos } from "../Hooks";
export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");
  const {
    addTodo,
    toggleTodo,
    toggleAllTodos,
    editTodo,
    deleteTodo,
    clearTodos,
    authUser,
    todos
  } = useTodos();

  return (
    <TodoContext.Provider
      value={{
        firebase,
        todos,
        authUser,
        addTodo,
        toggleTodo,
        toggleAllTodos,
        editTodo,
        deleteTodo,
        clearTodos,
        activeFilter,
        dispatchFilter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
