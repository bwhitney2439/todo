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

  const addTodo = content => {
    firebase.todos().add({ completed: false, content });
  };

  const toggleTodo = todo => {
    firebase.todo(todo.id).update({ completed: !todo.completed });
  };

  const toggleAllTodos = toggleAll => {
    todos.forEach(todo => {
      firebase.todo(todo.id).update({ completed: toggleAll });
    });
  };

  const editTodo = (id, content) => {
    firebase.todo(id).update({ content: content });
  };

  const deleteTodo = id => {
    firebase.todo(id).delete();
  };

  return (
    <TodoContext.Provider
      value={{
        firebase,
        todos,
        addTodo,
        toggleTodo,
        toggleAllTodos,
        editTodo,
        deleteTodo,
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
