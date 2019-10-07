import React, { createContext, useReducer, useEffect } from "react";

import { todoReducer } from "../reducers/todoReducer";
import { filterTodosReducer } from "../reducers/filterTodosReducer";
import firebase from "../config/firebase";
export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(todoReducer, []);
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");

  useEffect(() => {
    firebase.todos().onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });

      dispatchTodos({ type: "INITIAL", data });
    });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        firebase,
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
