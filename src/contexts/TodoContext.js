import React, { createContext, useReducer } from "react";

import { todoReducer } from "../reducers/todoReducer";
import { filterTodosReducer } from "../reducers/filterTodosReducer";

export const TodoContext = createContext();

const TodoContextProvider = props => {
  const [todos, dispatchTodos] = useReducer(todoReducer, []);
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");

  return (
    <TodoContext.Provider
      value={{ todos, dispatchTodos, activeFilter, dispatchFilter }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
