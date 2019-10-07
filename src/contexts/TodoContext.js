import React, { createContext, useReducer, useEffect } from "react";

import { todoReducer } from "../reducers/todoReducer";
import { filterTodosReducer } from "../reducers/filterTodosReducer";

export const TodoContext = createContext();

const TodoContextProvider = ({ children, firebase }) => {
  const [todos, dispatchTodos] = useReducer(todoReducer, []);
  const [activeFilter, dispatchFilter] = useReducer(filterTodosReducer, "All");

  useEffect(() => {
    firebase.todos().onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        dispatchTodos({
          type: "ADD_TODO",
          content: doc.data().content,
          id: doc.id
        });
      });
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
