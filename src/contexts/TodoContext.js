import React, { createContext, useReducer } from "react";

import { todoReducer } from "../reducers/todoReducer";
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import Firebase from "../config/firebase";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(todoReducer, []);
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");

  return (
    <TodoContext.Provider
      value={{
        firebase: Firebase,
        todos,
        dispatchTodos,
        activeFilter,
        dispatchFilter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
