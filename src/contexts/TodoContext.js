import React, { createContext, useReducer } from "react";

import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";
import { useAuth } from "../Hooks";
export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");
  const authUser = useAuth();
  // const {
  //   addTodo,
  //   toggleTodo,
  //   toggleAllTodos,
  //   editTodo,
  //   deleteTodo,
  //   clearTodos,
  //   todos
  // } = useTodos(authUser);

  return (
    <TodoContext.Provider
      value={{
        firebase,
        // todos,
        authUser,
        // addTodo,
        // toggleTodo,
        // toggleAllTodos,
        // editTodo,
        // deleteTodo,
        // clearTodos,
        activeFilter,
        dispatchFilter
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
