import React, { createContext, useReducer } from "react";

import { todoReducer } from "../reducers/todoReducer";
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import Firebase from "../config/firebase";

export const TodoContext = createContext();

const TodoContextProvider = props => {
  const [todos, dispatchTodos] = useReducer(todoReducer, []);
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");
  //   const firebase = new Firebase();

  return (
    <TodoContext.Provider
      value={
        (new Firebase(), { todos, dispatchTodos, activeFilter, dispatchFilter })
      }
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
