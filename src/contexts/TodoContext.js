import React, { createContext, useReducer } from "react";
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");

  return (
    <TodoContext.Provider
      value={{
        firebase,
        activeFilter,
        dispatchFilter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
