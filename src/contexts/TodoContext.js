import React, { createContext, useReducer } from "react";

import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";
import { useTodos, useAuth } from "../Hooks";
export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");
  const {
    todos,
    addTodo,
    toggleTodo,
    toggleAllTodos,
    editTodo,
    deleteTodo,
    clearTodos
  } = useTodos();

  const isSignedIn = useAuth();

  return (
    <TodoContext.Provider
      value={{
        firebase,
        todos,
        isSignedIn,
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
